// Runs against the real TypeScript modules; mocks only the outbound email service.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
const nodeRequire = createRequire(import.meta.url);
const root = fileURLToPath(new URL('../', import.meta.url));
const cache = new Map();
let emailFailure = false;
let sentEmail;
function load(file) {
  const resolved = path.resolve(root, file);
  if (cache.has(resolved)) return cache.get(resolved).exports;
  const loadedModule = { exports: {} };
  cache.set(resolved, loadedModule);
  const js = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const localRequire = (name) => {
    if (name === 'resend') return { Resend: class {
      emails = { send: async (payload) => { sentEmail = payload; return { error: emailFailure ? { message: 'Test delivery failure' } : null }; } };
    }};
    if (name.startsWith('@/')) return load(`src/${name.slice(2)}.ts`);
    return nodeRequire(name);
  };
  vm.runInThisContext(`(function(require,module,exports){${js}\n})`, { filename: resolved })(localRequire, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
async function main() {
  const { projects, galleryItems, services } = load('src/lib/site-data.ts');
  const { getProjectView, getGalleryCategory } = load('src/lib/project-categories.ts');
  const { validateAppointment } = load('src/lib/appointments.ts');
  const { businessContact, showroomContact } = load('src/lib/site-data.ts');
  assert.equal(businessContact.email, 'info@cvrconstruction.ca');
  assert.equal(showroomContact.email, businessContact.email);
  assert.equal(showroomContact.emailHref, businessContact.emailHref);
  const kitchen = projects.find(p => p.slug === 'dark-grey-kitchen');
  const bath = projects.find(p => p.slug === 'dark-grey-bathroom');
  assert.equal(kitchen.galleryImages.length, 2);
  assert.equal(bath.galleryImages.length, 6);
  assert.equal(getProjectView(kitchen, 'bathroom'), null);
  assert.equal(getProjectView(bath, 'kitchen'), null);
  const combined = { ...kitchen, title: 'Combined job', galleryImages: [...kitchen.galleryImages, ...bath.galleryImages], sections: [
    { ...kitchen, filter: 'kitchen' }, { ...bath, filter: 'bathroom' },
  ]};
  assert.equal(getProjectView(combined).galleryImages.length, kitchen.galleryImages.length + bath.galleryImages.length);
  assert.deepEqual(getProjectView(combined, 'kitchen').galleryImages, kitchen.galleryImages);
  assert.deepEqual(getProjectView(combined, 'bathroom').galleryImages, bath.galleryImages);
  const condo = galleryItems.filter(i => i.image.includes('condo-kitchen-and-marble-baths'));
  assert.equal(condo.filter(i => getGalleryCategory(i) === 'kitchen').length, 5);
  assert.equal(condo.filter(i => getGalleryCategory(i) === 'bathroom').length, 1);
  assert(services.find(s => s.projectCategory === 'commercial').galleryImages.every(i => !i.includes('deck')));
  assert.equal(projects.find(p => p.slug === 'forest-garden-studio').coverImage, '/images/victoria-forest-cabin-and-outhouse-001.webp');
  assert(!projects.find(p => p.slug === 'kitchen-renovation-custom-countertops').beforeAfterImages);
  assert(!projects.find(p => p.slug === 'kitchen-remodelling').galleryImages.some(i => i.endsWith('-027.webp')));
  const photos = [...projects.flatMap(p => [p.heroImage, p.coverImage, ...p.galleryImages, ...(p.beforeAfterImages || []).flatMap(c => [c.beforeImage, c.afterImage])]), ...galleryItems.map(i => i.image)];
  assert(!photos.some(i => /dark-gray-kitchen-and-bath-00[789]/.test(i)));
  for (const image of photos) assert(fs.existsSync(path.join(root, 'public', image)), `Missing ${image}`);
  const deck = projects.find(p => p.slug === 'upper-deck-and-stairs');
  assert(!deck.galleryImages.some(i => i.endsWith('upper-deck-and-stairs-005.webp')));
  const shower = projects.find(p => p.slug === 'framed-bathroom-renovation');
  assert(shower.beforeAfterImages[0].beforeImage.endsWith('-007.webp'));
  assert(shower.beforeAfterImages[0].afterImage.endsWith('-003.webp'));
  assert(!projects.find(p => p.slug === 'front-entry-rebuild').galleryImages.some(i => i.includes('commercial-interior')));
  assert(!photos.some(i => /dark-grey-kitchen-(wide|front)\.webp$/.test(i)));
  for (const p of projects) assert.equal(new Set(p.galleryImages).size, p.galleryImages.length, `Duplicate gallery photo in ${p.slug}`);
  const galleryImages = new Set([...projects.flatMap(p => p.galleryImages), ...galleryItems.map(i => i.image), ...services.flatMap(s => s.galleryImages)]);
  for (const p of projects) {
    assert((p.beforeAfterImages || []).length <= 1, `Multiple before images for ${p.slug}`);
    for (const comparison of p.beforeAfterImages || []) {
      assert(!galleryImages.has(comparison.beforeImage), `Before image leaked into a gallery: ${comparison.beforeImage}`);
    }
  }
  const excludedProgress = JSON.parse(fs.readFileSync(path.join(root, 'docs/gallery-excluded-progress-photos.json'), 'utf8'));
  for (const image of excludedProgress) assert(!galleryImages.has(image), `Progress image leaked into gallery: ${image}`);
  const fixedNow = new Date('2026-10-14T18:00:00Z');
  const fields = { name: 'Test visitor', email: 'visitor@example.com', date: '2026-10-15', time: '10:00', focus: 'Kitchen selections', notes: 'Countertops' };
  assert(validateAppointment(fields, fixedNow).data);
  for (const invalid of [{ date: '2026-10-18' }, { date: '2026-10-13' }, { date: '2026-02-30' }, { time: '03:00' }, { focus: 'Unknown' }, { email: 'invalid' }, { name: {} }, { notes: 'x'.repeat(3001) }]) {
    assert(validateAppointment({ ...fields, ...invalid }, fixedNow).error, JSON.stringify(invalid));
  }
  const { POST } = load('src/app/api/appointments/route.ts');
  const request = (body) => new Request('http://localhost/api/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  assert.equal((await POST(request(null))).status, 400);
  assert.equal((await POST(request({}))).status, 422);
  assert.equal((await POST(request({ website: 'spam' }))).status, 200);
  // Use a future bookable date independent of the execution date.
  const future = new Date(); future.setUTCDate(future.getUTCDate() + 7);
  while (future.getUTCDay() < 2 || future.getUTCDay() > 6) future.setUTCDate(future.getUTCDate() + 1);
  fields.date = future.toISOString().slice(0, 10);
  const previousKey = process.env.RESEND_API_KEY;
  const previousRecipient = process.env.APPOINTMENT_TO_ADDRESS;
  try {
    delete process.env.RESEND_API_KEY;
    assert.equal((await POST(request(fields))).status, 503);
    process.env.RESEND_API_KEY = 'test-only';
    process.env.APPOINTMENT_TO_ADDRESS = 'appointments@example.com';
    assert.equal((await POST(request(fields))).status, 200);
    assert.equal(sentEmail.to, 'info@cvrconstruction.ca');
    assert.equal(sentEmail.from, 'CVR Showroom <info@cvrconstruction.ca>');
    assert.equal(sentEmail.replyTo, fields.email);
    assert(sentEmail.text.includes(fields.date));
    assert(sentEmail.text.includes('not yet confirmed'));
    // A stale inbox override must not change the agreed destination.
    const { POST: contactPost } = load('src/app/api/contact/route.ts');
    const contactFields = { firstName: 'Test', lastName: 'Visitor', email: 'visitor@example.com', region: 'Victoria', subject: 'Kitchen', message: 'Test enquiry' };
    assert.equal((await contactPost(request(contactFields))).status, 200);
    assert.equal(sentEmail.to, 'info@cvrconstruction.ca');
    assert.equal(sentEmail.from, 'CVR Website <info@cvrconstruction.ca>');
    assert.equal(sentEmail.replyTo, contactFields.email);
    emailFailure = true;
    assert.equal((await POST(request(fields))).status, 502);
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previousKey;
    if (previousRecipient === undefined) delete process.env.APPOINTMENT_TO_ADDRESS; else process.env.APPOINTMENT_TO_ADDRESS = previousRecipient;
  }
  console.log('Passed: room isolation, combined project views, photo integrity, content corrections, appointment validation and API success/error paths. No email sent.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
