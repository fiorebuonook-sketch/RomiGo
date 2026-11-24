{
const SB_URL = 'https://hbgjasazaqybkjdvvanm.supabase.co';
const SB_KEY = 'sb_publishable_gn_DBzMfkQrVZF_tqYP-qg_9uhkv0He';
const BUCKET = 'romigo';
const WA = '5491144243022';
const DRIVE_HOOK = 'https://script.google.com/macros/s/AKfycbxxhavQjn82lQwQPh-Cs7Pcj33hvw-Be2lijoUbbGoo87DTeRuWhx9XtwKlqeAWwd9J/exec'; // URL de la app web de Apps Script (Romi Go → Drive)
const DOCS = ['Escritura', 'DNI del dueño', 'Autorización', 'Plano', 'Expensas', 'ABL'];
const STEPS = {
  tasar: ['Recibida', 'Informe', 'Enviada'],
  tokko: ['Recibida', 'Revisión', 'En Tokko', 'Publicada']
};
const STEP_LONG = {
  tasar: ['Recibida', 'Armando el informe', 'Tasación enviada'],
  tokko: ['Recibida', 'Revisando fotos y textos', 'Cargada en Tokko', 'Publicada en portales']
};
const CDN = 'https://d1v2p1s05qqabi.cloudfront.net/';
const kindOf = p => p && p.purpose === 'tasar' ? 'tasar' : 'tokko';
const lastStep = p => STEPS[kindOf(p)].length - 1;
const stepOf = p => Math.max(0, Math.min(lastStep(p), +p.step || 0));
const isDone = p => stepOf(p) === lastStep(p);
const PUB = [
['Depto 3 amb. reciclado','Club de Campo Hacoaj','Venta','USD 155.000','63 m²','venta-departamento-3-amb-reciclado-club-de-campo-hacoaj--4396899','15668328/conversions/1747694292'],
['Depto 1 dorm. full amenities','Palermo Hollywood','Venta','USD 211.640','57 m²','venta-dpto-1-habitacion-full-amenities-palermo-hollywood--4617254','23025628/conversions/1776785899'],
['Galpón industrial','Avellaneda','Venta','USD 490.000','930 m²','galpon-industrial-con-excelente-conectividad-y-rapido-acceso-a-autopistas-avellaneda--4663040','24794072/conversions/1781192299'],
['Oficina premium, 2 cocheras','Lima al 200','Venta','USD 250.000','297 m²','venta-oficina-premium-29735m2-vista-abierta-hacia-av-9-de-julio-2-cocheras--4663620','24817369/conversions/1781289506'],
['Cochera','Recoleta','Venta','USD 15.000','15 m²','cochera-excelente-ubicacion-recoleta--4689870','27569919/conversions/1791473893'],
['Oficina 300 m², vista a 9 de Julio','Lima al 200','Alquiler','$3.000.000','300 m²','alquiler-oficina-300m2-vista-abierta-hacia-av-9-de-julio--4695605','26552614/conversions/1787323099'],
['Oficina 170 m², vista a 9 de Julio','Lima al 200','Alquiler','$1.800.000','170 m²','alquiler-oficina-170m2-vista-abierta-hacia-av-9-de-julio--4695606','26552628/conversions/1787323105'],
['Oficina 130 m²','Monserrat','Alquiler','$1.200.000','130 m²','alquiler-oficina-130m2-monserrat--4695607','27273850/conversions/1790541499'],
['Depto 3 dorm. c/ dependencia','Belgrano','Venta','USD 279.000','102 m²','dpto-3-habitaciones-c-dependencia-patio-balcon-belgrano--4699816','26761147/conversions/1788341896'],
['Depto 2 dorm. c/ dependencia','Belgrano','Venta','USD 279.000','102 m²','dpto-2-habitaciones-c-dependencia-patio-balcon-belgrano--4700532','26767158/conversions/1788356302'],
['Depto 5 dorm. con cochera','Belgrano','Venta','USD 799.000','263 m²','departamento-5-habitaciones-con-dependencia-y-cochera-belgrano--4704558','26940420/conversions/1788986298'],
['Galpón industrial','Avellaneda','Alquiler','$5.000.000','930 m²','alquiler-galpon-industrial-avellaneda--4707231','27046479/conversions/1789501116'],
['Depto 1 dorm.','Belgrano','Venta','USD 94.000','40 m²','venta-departamento-1-habitacion-belgrano--4711811','27248156/conversions/1790354313'],
['Depto 1 dorm. a estrenar','Caballito','Venta','USD 109.000','44 m²','venta-dpto-1-habitacion-a-estrenar-caballito--4724844','27906745/conversions/1793093927'],
['Depto 2 amb.','Caballito','Venta','USD 89.900','44 m²','departamento-2-ambientes-caballito--4724845','27884287/conversions/1793025543'],
['Local comercial','Villa Crespo','Alquiler','$3.300.000','146 m²','alquiler-local-comercial-villa-crespo--4725638','27915995/conversions/1793122715'],
['Oficina 300 m², vista a 9 de Julio','Lima al 200','Venta','USD 285.000','300 m²','venta-oficina-300m2-vista-abierta-hacia-av-9-de-julio--4725639','27916007/conversions/1793122719']];

const I = {
  check: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  plus: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  doc: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>',
  home: '<svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  pin: '<svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  down: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12M6 10l6 6 6-6M4 20h16"/></svg>',
  chev: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'
};

const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const okPath = p => typeof p === 'string' && /^[A-Za-z0-9/_.-]{3,200}$/.test(p) && !p.includes('..');
const buzz = () => { try { navigator.vibrate && navigator.vibrate(12); } catch (e) {} };
const sb = window.supabase ? window.supabase.createClient(SB_URL, SB_KEY) : null;
let pubs = PUB.map((l, i) => ({ id: 'local' + i, orden: i, titulo: l[0], zona: l[1], op: l[2], precio: l[3], m2: l[4], url: 'https://coldwellbankerseniority.com/propiedad/' + l[5], foto: CDN + l[6] + '-thumbnail.webp' }));
let owner = false, tab = 'cargar', kindF = 'todas', opF = 'Todas', props = [], deferRender = false, signed = {}, open = {};

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
function blank() { return { id: newId(), editing: false, editDir: '', orig: null, purpose: 'tokko', op: 'Venta', calle: '', numero: '', piso: '', depto: '', nota: '', photos: [], docs: {}, audio: null }; }
let d = blank();
try { const s = JSON.parse(localStorage.getItem('romigo-draft') || 'null'); if (s && typeof s === 'object' && s.id) d = Object.assign(blank(), s); } catch (e) {}
function save() {
  try {
    const c = JSON.parse(JSON.stringify(d, (k, v) => k === 'local' ? undefined : v));
    c.photos = c.photos.filter(p => p.path);
    for (const k in c.docs) if (!c.docs[k].path) delete c.docs[k];
    if (c.audio && !c.audio.path) c.audio = null;
    localStorage.setItem('romigo-draft', JSON.stringify(c));
  } catch (e) {}
}

function toast(t) { const el = $('toast'); el.textContent = t; el.hidden = false; el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; clearTimeout(toast.t); toast.t = setTimeout(() => el.hidden = true, 3500); }
function dir() { return [d.calle.trim(), d.numero.trim()].filter(Boolean).join(' ') + (d.piso.trim() ? ', ' + d.piso.trim() + '°' : '') + (d.depto.trim() ? ' ' + d.depto.trim() : ''); }
function pending() { return d.photos.filter(p => p.status === 'up').length + Object.values(d.docs).filter(x => x.status === 'up').length + (d.audio && d.audio.status === 'up' ? 1 : 0); }
const nPhotos = () => d.photos.filter(p => p.path).length;
const nDocs = () => Object.values(d.docs).filter(x => x.path).length;
const hasTell = () => !!((d.audio && d.audio.path) || d.nota.trim());
function doneCount() { return 1 + (d.calle.trim() ? 1 : 0) + (nPhotos() ? 1 : 0) + (hasTell() ? 1 : 0) + nDocs(); }
function greet() { const h = new Date().getHours(); return h < 13 ? 'Buen día, Romi' : h < 20 ? 'Buenas tardes, Romi' : 'Buenas noches, Romi'; }

function syncHero() {
  const ring = $('ring'), stats = $('stats');
  if (tab === 'cargar') {
    const n = doneCount(), pct = Math.round(n / 10 * 100), f = 10 - n;
    $('hSmall').textContent = d.editing ? 'Editando' : greet(); $('hTitle').textContent = d.editing ? (dir() || d.editDir || 'Propiedad') : 'Nueva propiedad';
    $('hSub').textContent = f === 0 ? 'Está todo, ya podés avisar' : 'Te faltan ' + f + (f === 1 ? ' cosa' : ' cosas');
    ring.hidden = false; stats.hidden = true;
    $('arc').setAttribute('stroke-dashoffset', (188.5 * (1 - n / 10)).toFixed(1)); $('ringTxt').textContent = pct + '%';
    $('fill').style.transform = 'scaleX(' + (n / 10) + ')'; $('send').classList.toggle('full', n >= 6);
  } else if (tab === 'ingresos') {
    ring.hidden = true; stats.hidden = false;
    $('hSmall').textContent = owner ? 'Panel de Fiore' : 'Lo que le pasaste a Fiore';
    $('hTitle').textContent = owner ? 'Ingresos de Romi' : 'Mis ingresos'; $('hSub').textContent = '';
    $('sTot').textContent = props.length; $('sCur').textContent = props.filter(p => !isDone(p)).length; $('sOk').textContent = props.filter(isDone).length;
  } else {
    ring.hidden = true; stats.hidden = true;
    $('hSmall').textContent = 'Tu vidriera'; $('hTitle').textContent = 'Publicadas'; $('hSub').textContent = pubs.length + ' propiedades en tu página';
  }
}
function syncSteps() {
  const ok = [true, !!d.calle.trim(), nPhotos() > 0, nDocs() > 0, hasTell()];
  [...$('steps').children].forEach((b, i) => { b.classList.toggle('ok', ok[i]); b.querySelector('i').innerHTML = ok[i] ? I.check.replace('16', '13').replace('16', '13') : String(i + 1); });
  ['c1', 'c2', 'c3', 'c4', 'c5'].forEach((id, i) => { const c = $(id); c.classList.toggle('ok', ok[i]); c.querySelector('.num').innerHTML = ok[i] ? I.check : String(i + 1); });
  const np = nPhotos(), nd = nDocs();
  $('phTag').hidden = !np; $('phTag').textContent = np + (np === 1 ? ' foto' : ' fotos');
  $('docTag').hidden = !nd; $('docTag').textContent = nd + ' de 6';
}
function waMsg() {
  const para = d.purpose === 'tasar' ? 'tasar' : 'subir a Tokko';
  const got = DOCS.filter((x, i) => d.docs[i] && d.docs[i].path), miss = DOCS.filter((x, i) => !(d.docs[i] && d.docs[i].path));
  const x = dir(), np = nPhotos(), nota = d.nota.trim();
  const L = ['Hola Fiore! Te comparto la nueva propiedad en *' + d.op.toLowerCase() + '* para *' + para + '*.', ''];
  L.push('📍 *Dirección:* ' + (x || 'sin cargar'));
  L.push('🏷️ *Operación:* ' + d.op);
  L.push('📸 *Fotos:* ' + (np ? np : 'ninguna todavía'));
  L.push('📄 *Papeles (' + got.length + ' de 6):* ' + (got.length ? got.join(', ') : 'ninguno todavía'));
  if (miss.length && got.length) L.push('   Faltan: ' + miss.join(', '));
  L.push('🎙️ *Audio:* ' + (d.audio && d.audio.path ? 'sí' : 'no'));
  if (nota) L.push('📝 *Nota:* ' + (nota.length > 300 ? nota.slice(0, 300) + '…' : nota));
  L.push('', 'Está todo cargado en Romi Go.');
  return L.join('\n');
}
function waLink() { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(waMsg()); }
function syncSend() {
  $('send').href = d.editing ? '#' : waLink();
  $('sendLbl').textContent = d.editing ? 'Guardar cambios' : 'Listo, avisar a Fiore';
  $('editBar').hidden = !d.editing; if (d.editing) $('editTxt').textContent = d.editDir || dir();
}
function syncAll() { syncSteps(); syncSend(); syncHero(); }

function renderGrid() {
  $('grid').innerHTML = d.photos.map((p, i) => {
    const ov = p.status === 'up' ? '<div class="ov"><div class="spin"></div></div>' : p.status === 'err' ? '<div class="ov">No se subió</div>' : '';
    const img = p.local ? '<img alt="Foto ' + (i + 1) + '" src="' + esc(p.local) + '">' : '<div class="ov" style="background:#2A2E35">' + I.check + '</div>';
    return '<div class="ph">' + img + ov + (i === 0 && p.status !== 'up' ? '<span class="cov">Portada</span>' : '') + '<button class="x" data-i="' + i + '" aria-label="Quitar foto ' + (i + 1) + '">×</button></div>';
  }).join('');
}
function renderDocs() {
  $('docs').innerHTML = DOCS.map((l, i) => {
    const x = d.docs[i], cls = x ? (x.status === 'err' ? 'err' : x.path ? 'done' : '') : '';
    const thumb = x && x.isImg && x.local && x.path ? '<img class="tn" alt="" src="' + esc(x.local) + '">' : '';
    const ic = x && x.status === 'up' ? '<div class="spin" style="width:18px;height:18px;border-color:#ddd;border-top-color:#FF5B2E"></div>' : x && x.path ? I.check : I.plus;
    const sm = x ? (x.status === 'up' ? 'Subiendo…' : x.status === 'err' ? 'Tocá para reintentar' : 'Cargado') : 'Falta';
    return '<label class="doc ' + cls + '"><input class="hide" type="file" accept="image/*,application/pdf" data-i="' + i + '"><div class="di">' + ic + '</div>' + thumb + '<div><b>' + esc(l) + '</b><small>' + sm + '</small></div></label>';
  }).join('');
}
function renderAudio() {
  const a = d.audio, rec = !!recorder;
  $('waves').hidden = !rec; $('recBtn').classList.toggle('pulse', rec); $('recBox').classList.toggle('on', rec);
  $('recBtn').setAttribute('aria-label', rec ? 'Terminar audio' : 'Grabar audio');
  $('recIco').innerHTML = rec ? '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>' : '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4"/>';
  $('audioTxt').textContent = rec ? 'Grabando… tocá para terminar' : !a ? 'Tocá para grabar' : a.status === 'up' ? 'Guardando audio…' : a.status === 'err' ? 'No se pudo guardar. Probá de nuevo' : 'Audio guardado ✓';
  const pl = $('audioPlay');
  if (a && a.local && !rec) { if (pl.src !== a.local) pl.src = a.local; pl.hidden = false; } else pl.hidden = true;
}
function syncChoice() {
  for (const b of $('purpose').querySelectorAll('.opt')) b.classList.toggle('on', b.dataset.v === d.purpose);
  $('op').dataset.v = d.op; for (const b of $('op').querySelectorAll('button')) b.classList.toggle('on', b.dataset.v === d.op);
}
function renderCargar() {
  for (const k of ['calle', 'numero', 'piso', 'depto', 'nota']) if ($(k).value !== d[k]) $(k).value = d[k];
  syncChoice(); renderGrid(); renderDocs(); renderAudio(); syncAll();
}

async function shrink(file) {
  if (!/^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type || '')) return file;
  try {
    const bmp = await createImageBitmap(file); const m = 2000, s = Math.min(1, m / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise(r => c.toBlob(b => r(b || file), 'image/jpeg', .86));
  } catch (e) { return file; }
}
function extOf(type, name) {
  const m = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/heic': 'heic', 'application/pdf': 'pdf', 'audio/webm': 'webm', 'audio/mp4': 'm4a', 'audio/x-m4a': 'm4a', 'audio/mpeg': 'mp3', 'audio/ogg': 'ogg', 'audio/aac': 'aac', 'audio/wav': 'wav', 'audio/3gpp': '3gp', 'audio/amr': 'amr' };
  const t = (type || '').split(';')[0].toLowerCase();
  if (m[t]) return m[t];
  const e = (name || '').split('.').pop().toLowerCase();
  return /^[a-z0-9]{2,5}$/.test(e) ? e : 'bin';
}
async function upload(file, folder, base) {
  if (!sb) throw new Error('nosb');
  const b = /^image\//.test(file.type || '') ? await shrink(file) : file;
  if (b.size > 25 * 1024 * 1024) throw new Error('big');
  const ct = (b.type || file.type || 'application/octet-stream').split(';')[0];
  const path = d.id + '/' + folder + '/' + base + '-' + Math.random().toString(36).slice(2, 7) + '.' + extOf(ct, file.name);
  let { error } = await sb.storage.from(BUCKET).upload(path, b, { contentType: ct, upsert: false });
  if (error) { await new Promise(r => setTimeout(r, 1200)); ({ error } = await sb.storage.from(BUCKET).upload(path, b, { contentType: ct, upsert: false })); }
  if (error) throw error;
  return path;
}
function upErr(e) { toast(e && e.message === 'big' ? 'Ese archivo es muy pesado (máx. 25 MB).' : 'No se pudo subir. Revisá la conexión y probá de nuevo.'); }

async function addPhotos(files) {
  const items = files.map(f => ({ f, p: { local: URL.createObjectURL(f), status: 'up' } }));
  for (const it of items) d.photos.push(it.p);
  renderGrid(); syncAll();
  for (const it of items) {
    try { it.p.path = await upload(it.f, 'fotos', 'foto'); it.p.status = 'ok'; buzz(); } catch (e) { it.p.status = 'err'; upErr(e); }
    renderGrid(); syncAll(); save();
  }
}
async function addDoc(i, f) {
  const x = { local: URL.createObjectURL(f), isImg: /^image\//.test(f.type), status: 'up' }; d.docs[i] = x; renderDocs();
  const slug = DOCS[i].normalize('NFD').replace(/[^\w ]/g, '').replace(/ /g, '-').toLowerCase();
  try { x.path = await upload(f, 'papeles', slug); x.status = 'ok'; buzz(); } catch (e) { x.status = 'err'; upErr(e); }
  renderDocs(); syncAll(); save();
}
async function addAudio(f) {
  d.audio = { status: 'up', local: URL.createObjectURL(f) }; renderAudio();
  try { d.audio.path = await upload(f, 'audio', 'audio'); d.audio.status = 'ok'; buzz(); } catch (e) { d.audio.status = 'err'; upErr(e); }
  renderAudio(); syncAll(); save();
}

let recorder = null, recTimer = null, recSecs = 0, recStream = null;
async function toggleRec() {
  if (recorder) { recorder.stop(); return; }
  if (!navigator.mediaDevices || !window.MediaRecorder) { $('inAudio').click(); return; }
  try { recStream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch (e) { toast('No se pudo usar el micrófono. Podés subir un audio o escribir la nota.'); return; }
  const chunks = [];
  recorder = new MediaRecorder(recStream);
  recorder.ondataavailable = ev => { if (ev.data && ev.data.size) chunks.push(ev.data); };
  recorder.onstop = () => {
    clearInterval(recTimer); recStream.getTracks().forEach(t => t.stop());
    const type = (recorder.mimeType || 'audio/webm').split(';')[0]; recorder = null;
    const blob = new Blob(chunks, { type });
    if (blob.size) addAudio(new File([blob], 'audio.' + extOf(type), { type })); else renderAudio();
  };
  recSecs = 0; $('recTime').textContent = '0:00';
  recTimer = setInterval(() => { recSecs++; $('recTime').textContent = Math.floor(recSecs / 60) + ':' + String(recSecs % 60).padStart(2, '0'); }, 1000);
  recorder.start(); buzz(); renderAudio();
}

for (const k of ['calle', 'numero', 'piso', 'depto', 'nota']) $(k).addEventListener('input', e => { d[k] = e.target.value; syncAll(); save(); });
$('purpose').addEventListener('click', e => { const b = e.target.closest('.opt'); if (!b) return; d.purpose = b.dataset.v; buzz(); syncChoice(); syncAll(); save(); });
$('op').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; d.op = b.dataset.v; buzz(); syncChoice(); syncAll(); save(); });
$('steps').addEventListener('click', e => { const b = e.target.closest('.st'); if (b) $(b.dataset.go).scrollIntoView({ behavior: 'smooth', block: 'start' }); });
$('inCam').addEventListener('change', e => { addPhotos([...e.target.files]); e.target.value = ''; });
$('inGal').addEventListener('change', e => { addPhotos([...e.target.files]); e.target.value = ''; });
$('inAudio').addEventListener('change', e => { const f = e.target.files[0]; if (f) addAudio(f); e.target.value = ''; });
$('recBtn').addEventListener('click', toggleRec);
$('docs').addEventListener('change', e => { const i = e.target.dataset.i, f = e.target.files && e.target.files[0]; if (i != null && f) addDoc(+i, f); e.target.value = ''; });
$('grid').addEventListener('click', e => { const b = e.target.closest('.x'); if (!b) return; d.photos.splice(+b.dataset.i, 1); renderGrid(); syncAll(); save(); });

let sending = false;
$('send').addEventListener('click', async e => {
  e.preventDefault();
  if (sending) return;
  if (recorder) { toast('Primero terminá de grabar el audio.'); return; }
  const n = pending();
  if (n) { toast('Esperá un segundo, se están subiendo ' + n + ' archivo' + (n > 1 ? 's' : '') + '.'); return; }
  if (!sb) { toast('No hay conexión con el servidor. Revisá internet.'); return; }
  if (d.editing) { saveEdit(); return; }
  sending = true; const link = waLink();
  const docs = {}; for (const k in d.docs) if (d.docs[k].path) docs[k] = { path: d.docs[k].path, isImg: !!d.docs[k].isImg };
  const row = { id: d.id, dir: dir() || 'Sin dirección', calle: d.calle.trim(), numero: d.numero.trim(), piso: d.piso.trim(), depto: d.depto.trim(),
    op: d.op, purpose: d.purpose, nota: d.nota.trim().slice(0, 4000), photos: d.photos.filter(p => p.path).map(p => p.path), docs, audio: d.audio && d.audio.path ? d.audio.path : null };
  const { error } = await sb.from('props').insert(row);
  sending = false;
  if (error) { toast('No se pudo guardar. Revisá internet y volvé a tocar.'); return; }
  if (/^https:\/\/script\.google\.com\//.test(DRIVE_HOOK)) { try { navigator.sendBeacon(DRIVE_HOOK, new Blob([JSON.stringify({ id: row.id })], { type: 'text/plain' })); } catch (e) {} }
  buzz();
  $('overH').textContent = '¡Listo, Romi!'; $('overWa').hidden = true;
  $('overTxt').textContent = 'Fiore ya tiene ' + row.dir + '. Ahora se abre WhatsApp para avisarle.';
  const sumRows = [['Para', row.purpose === 'tasar' ? 'Tasar' : 'Subir a Tokko'], ['Operación', row.op], ['Fotos', String(row.photos.length)], ['Papeles', Object.keys(docs).length + ' de 6'], ['Audio', row.audio ? 'Sí' : 'No']];
  $('sum').innerHTML = sumRows.map(r => '<div><span>' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></div>').join('');
  $('over').hidden = false;
  d = blank(); save(); renderCargar(); loadProps();
  setTimeout(() => { location.href = link; }, 1400);
});
$('again').addEventListener('click', () => { $('over').hidden = true; setTab('cargar'); });
$('editCancel').addEventListener('click', () => { d = blank(); save(); renderCargar(); setTab('ingresos'); });
function startEdit(p) {
  const docs = {}; const pd = p.docs && typeof p.docs === 'object' ? p.docs : {};
  for (const k in pd) if (pd[k] && okPath(pd[k].path)) docs[k] = { path: pd[k].path, isImg: !!pd[k].isImg, status: 'ok' };
  d = { id: p.id, editing: true, editDir: p.dir || '', purpose: kindOf(p), op: p.op === 'Alquiler' ? 'Alquiler' : 'Venta',
    calle: p.calle || '', numero: p.numero || '', piso: p.piso || '', depto: p.depto || '', nota: p.nota || '',
    photos: (Array.isArray(p.photos) ? p.photos : []).filter(okPath).map(x => ({ path: x, status: 'ok' })),
    docs, audio: okPath(p.audio) ? { path: p.audio, status: 'ok' } : null,
    orig: { photos: (p.photos || []).length, docs: Object.keys(pd), audio: !!p.audio, step: stepOf(p) } };
  save(); setTab('cargar'); renderCargar();
}
async function saveEdit() {
  sending = true;
  const docs = {}; for (const k in d.docs) if (d.docs[k].path) docs[k] = { path: d.docs[k].path, isImg: !!d.docs[k].isImg };
  const row = { dir: dir() || d.editDir || 'Sin dirección', calle: d.calle.trim(), numero: d.numero.trim(), piso: d.piso.trim(), depto: d.depto.trim(),
    op: d.op, purpose: d.purpose, nota: d.nota.trim().slice(0, 4000), photos: d.photos.filter(p => p.path).map(p => p.path), docs, audio: d.audio && d.audio.path ? d.audio.path : null, updated_at: new Date().toISOString() };
  const { error } = await sb.from('props').update(row).eq('id', d.id);
  sending = false;
  if (error) { toast('No se pudieron guardar los cambios. Revisá internet.'); return; }
  if (/^https:\/\/script\.google\.com\//.test(DRIVE_HOOK)) { try { navigator.sendBeacon(DRIVE_HOOK, new Blob([JSON.stringify({ id: d.id })], { type: 'text/plain' })); } catch (e) {} }
  const o = d.orig || { photos: 0, docs: [], audio: false };
  const nuevosDocs = Object.keys(docs).filter(k => o.docs.indexOf(k) < 0).map(k => DOCS[+k]);
  const masFotos = row.photos.length - o.photos;
  const cambios = [];
  if (nuevosDocs.length) cambios.push('📄 Sumé: ' + nuevosDocs.join(', '));
  if (masFotos > 0) cambios.push('📸 ' + masFotos + (masFotos === 1 ? ' foto nueva' : ' fotos nuevas'));
  if (row.audio && !o.audio) cambios.push('🎙️ Audio nuevo');
  const faltan = DOCS.filter((x, i) => !docs[i]);
  const msg = 'Hola Fiore! Actualicé *' + row.dir + '* en Romi Go.\n' + (cambios.length ? '\n' + cambios.join('\n') + '\n' : '') + (faltan.length ? '\nFaltan: ' + faltan.join(', ') : '\nYa están los 6 papeles.');
  $('overH').textContent = '¡Cambios guardados!';
  $('overTxt').textContent = 'Fiore ya puede ver lo nuevo de ' + row.dir + '.';
  $('sum').innerHTML = [['Fotos', String(row.photos.length)], ['Papeles', Object.keys(docs).length + ' de 6'], ['Audio', row.audio ? 'Sí' : 'No']].map(r => '<div><span>' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></div>').join('');
  $('overWa').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg); $('overWa').hidden = false;
  $('over').hidden = false; buzz();
  d = blank(); save(); renderCargar(); loadProps();
}
function askLink(p) {
  const kind = kindOf(p);
  const msg = 'Hola Fiore! Te consulto por *' + (p.dir || 'una propiedad') + '* (' + (kind === 'tasar' ? 'tasación' : 'Tokko') + '). ¿En qué etapa está?\nEn Romi Go me figura: *' + STEP_LONG[kind][stepOf(p)] + '*.';
  return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
}
function delRomi(p) {
  openSheet('<h2>¿Eliminar esta propiedad?</h2><p>' + esc(p.dir) + '</p><div class="note" style="margin:0">Se borra de tu lista en Romi Go. <b>No se puede deshacer.</b></div><div class="g2"><button class="btn line" data-close>Cancelar</button><button class="btn red" id="rdOk">Sí, eliminar</button></div>');
  $('rdOk').onclick = async () => {
    $('rdOk').disabled = true;
    const { error } = await sb.from('props').delete().eq('id', p.id);
    if (error) { $('rdOk').disabled = false; toast('No se pudo eliminar.'); return; }
    props = props.filter(x => x.id !== p.id); closeSheet(); renderIng(); syncHero(); toast('Propiedad eliminada.');
  };
}
$('goIng').addEventListener('click', () => { $('over').hidden = true; setTab('ingresos'); });

const TABS = ['cargar', 'ingresos', 'publicadas'];
function setTab(t) {
  tab = t; for (const b of $('tabs').querySelectorAll('.tab')) b.classList.toggle('on', b.dataset.t === t);
  $('hl').style.transform = 'translateX(' + (TABS.indexOf(t) * 100) + '%)';
  $('v-cargar').hidden = t !== 'cargar'; $('sendbar').hidden = t !== 'cargar'; $('v-ingresos').hidden = t !== 'ingresos'; $('v-publicadas').hidden = t !== 'publicadas';
  if (t === 'ingresos') { renderIng(); loadProps(); } if (t === 'publicadas') renderPub();
  syncHero(); window.scrollTo({ top: 0 });
}
$('tabs').addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) { buzz(); setTab(b.dataset.t); } });

function ago(ts) { const m = Math.round((Date.now() - new Date(ts).getTime()) / 60000); if (!(m >= 0)) return ''; if (m < 1) return 'recién'; if (m < 60) return 'hace ' + m + ' min'; const h = Math.round(m / 60); if (h < 24) return 'hace ' + h + ' h'; const dd = Math.round(h / 24); return dd === 1 ? 'ayer' : 'hace ' + dd + ' días'; }

let loading = false, loadedOnce = false;
async function loadProps() {
  if (!sb || loading) return; loading = true;
  const { data, error } = await sb.from('props').select('*').order('created_at', { ascending: false }).limit(300);
  loading = false;
  if (error) { if (tab === 'ingresos' && !loadedOnce) $('ingList').innerHTML = '<div class="empty"><b>No se pudieron cargar</b>Revisá internet y volvé a entrar.</div>'; return; }
  loadedOnce = true; props = data || [];
  const cur = props.filter(p => !isDone(p)).length; $('ingBd').hidden = !cur; $('ingBd').textContent = cur;
  if (owner) await signAll();
  if (tab === 'ingresos') renderIng(); syncHero();
}
async function signAll() {
  const paths = [];
  for (const p of props) {
    for (const x of (Array.isArray(p.photos) ? p.photos : [])) if (okPath(x) && !signed[x]) paths.push(x);
    const dc = p.docs && typeof p.docs === 'object' ? p.docs : {};
    for (const k in dc) if (dc[k] && okPath(dc[k].path) && !signed[dc[k].path]) paths.push(dc[k].path);
    if (okPath(p.audio) && !signed[p.audio]) paths.push(p.audio);
  }
  for (let i = 0; i < paths.length; i += 100) {
    const { data } = await sb.storage.from(BUCKET).createSignedUrls(paths.slice(i, i + 100), 60 * 60 * 6);
    for (const r of data || []) if (r.signedUrl && /^https:\/\//.test(r.signedUrl)) signed[r.path] = r.signedUrl;
  }
}

function renderIng() {
  if (document.activeElement && document.activeElement.closest && document.activeElement.closest('#ingList textarea')) { deferRender = true; return; }
  $('fioreBar').hidden = !owner;
  $('login').hidden = owner || location.hash !== '#fiore';
  syncHero();
  if (!sb) { $('ingList').innerHTML = '<div class="empty"><b>Sin conexión</b>No hay conexión con el servidor.</div>'; return; }
  if (!loadedOnce) { $('ingList').innerHTML = '<div class="skel"></div><div class="skel"></div>'; return; }
  const list = props.filter(p => kindF === 'todas' || (kindF === 'listas' ? isDone(p) : kindOf(p) === kindF));
  if (!list.length) { $('ingList').innerHTML = '<div class="empty"><b>' + (props.length ? 'Nada por acá' : 'Todavía no hay ingresos') + '</b>' + (props.length ? 'No hay ingresos con este filtro.' : 'Tocá Cargar para subir la primera propiedad.') + '</div>'; return; }
  $('ingList').innerHTML = list.map((p, i) => {
    const kind = kindOf(p), steps = STEPS[kind], n = steps.length, st = stepOf(p), done = isDone(p);
    const photos = (Array.isArray(p.photos) ? p.photos : []).filter(okPath), docs = p.docs && typeof p.docs === 'object' ? p.docs : {};
    const nd = Object.keys(docs).length, pid = esc(p.id);
    const cov = owner && photos[0] && signed[photos[0]] ? '<button class="cover" data-act="lb" data-id="' + pid + '" data-i="0" style="padding:0;border:0;overflow:hidden"><img alt="Portada" src="' + esc(signed[photos[0]]) + '" style="width:100%;height:100%;object-fit:cover;display:block"></button>' : '<div class="cover">' + I.home + '</div>';
    let h = '<article class="ing" style="animation-delay:' + Math.min(i * .05, .4) + 's"><div class="hd">' + cov + '<div style="flex:1"><h3>' + esc(p.dir) + '</h3><div class="meta">' + esc(p.op) + ' · ' + photos.length + ' fotos · ' + nd + '/6 papeles' + (p.audio ? ' · audio' : '') + '</div><span class="badge k-' + kind + '">' + (kind === 'tasar' ? 'Tasación' : 'Tokko') + ' · ' + esc(ago(p.created_at)) + '</span></div></div>';
    const edge = 100 / (2 * n);
    h += '<div class="track"><div class="dots" style="grid-template-columns:repeat(' + n + ',minmax(0,1fr))"><span style="position:absolute;left:' + edge + '%;right:' + edge + '%;top:11px;height:3px;background:var(--line);border-radius:3px"></span><div class="bar" style="left:' + edge + '%;width:' + (st / (n - 1) * (100 - 2 * edge)) + '%"></div>' + steps.map((x, j) => '<div class="dot ' + (j < st || done ? 'd' : j === st ? 'n' : '') + '"><i>' + (j < st || done ? I.check.replace(/16/g, '12') : '') + '</i>' + esc(x) + '</div>').join('') + '</div></div>';
    h += '<div class="note"><b>' + esc(STEP_LONG[kind][st]) + '</b>' + (p.fiore_note ? '\n' + esc(p.fiore_note) : '') + '</div>';
    if (!owner) {
      h += '<div class="acts"><button data-act="redit" data-id="' + pid + '"><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>Editar</button><button class="del" data-act="rdel" data-id="' + pid + '"><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>Eliminar</button></div>';
      h += '<div style="padding:0 16px 16px"><a class="btn go" style="width:100%;height:48px" target="_blank" rel="noopener" href="' + esc(askLink(p)) + '"><svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>Preguntar a Fiore en qué etapa está</a></div>';
    }
    if (owner) {
      const imgDocs = Object.keys(docs).filter(k => docs[k] && docs[k].isImg && signed[docs[k].path]);
      const pdfDocs = Object.keys(docs).filter(k => docs[k] && !docs[k].isImg && signed[docs[k].path]);
      const ph = photos.filter(x => signed[x]);
      const shown = ph.slice(0, 6);
      let t = shown.map((x, k) => '<button data-act="lb" data-id="' + pid + '" data-i="' + k + '" aria-label="Ver foto ' + (k + 1) + '"><img loading="lazy" alt="" src="' + esc(signed[x]) + '">' + (k === 5 && ph.length > 6 ? '<span class="more">+' + (ph.length - 6) + '</span>' : '') + '</button>').join('');
      t += imgDocs.map((k, j) => '<button data-act="lb" data-id="' + pid + '" data-i="' + (ph.length + j) + '" aria-label="Ver ' + esc(DOCS[+k] || 'papel') + '"><img loading="lazy" alt="" src="' + esc(signed[docs[k].path]) + '"><span class="more" style="background:rgba(14,16,19,.45);font-size:10px;font-family:inherit;align-items:end;padding-bottom:5px">' + esc(DOCS[+k] || 'Papel') + '</span></button>').join('');
      t += pdfDocs.map(k => '<a class="flink" style="flex:none;height:64px" target="_blank" rel="noopener" href="' + esc(signed[docs[k].path]) + '">' + I.doc + esc(DOCS[+k] || 'Papel') + '</a>').join('');
      if (t) h += '<div class="thumbs">' + t + '</div>';
      h += '<div class="acts"><button data-act="edit" data-id="' + pid + '"><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>Editar</button><button class="del" data-act="del" data-id="' + pid + '"><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>Eliminar</button></div>';
      const isOpen = !!open[p.id];
      h += '<button class="tg" data-act="tg" data-id="' + pid + '">' + (isOpen ? 'Ocultar' : 'Mover de paso, nota, audio y descarga') + ' <span style="display:inline-flex;transform:rotate(' + (isOpen ? 180 : 0) + 'deg);transition:transform .3s">' + I.chev + '</span></button>';
      if (isOpen) {
        h += '<div class="more">';
        if (typeof p.drive_url === 'string' && /^https:\/\/drive\.google\.com\//.test(p.drive_url)) h += '<a class="btn line" target="_blank" rel="noopener" href="' + esc(p.drive_url) + '">Abrir carpeta en Drive</a>';
        else h += '<div style="font-size:12.5px;color:var(--mut)">Se está copiando a tu Drive (tarda hasta 10 min).</div>';
        h += '<div style="font-size:12.5px;font-weight:700;color:var(--mut)">Mover a</div><div class="row">' + STEP_LONG[kind].map((x, j) => '<button class="mini' + (j === st ? ' on' : '') + '" data-act="step" data-id="' + pid + '" data-v="' + j + '">' + esc(x) + '</button>').join('') + '</div>';
        if (p.nota) h += '<div class="note" style="margin:0"><b>Nota de Romi</b>\n' + esc(p.nota) + '</div>';
        if (signed[p.audio]) h += '<audio controls preload="none" src="' + esc(signed[p.audio]) + '" style="width:100%"></audio>';
        h += '<label class="f">Nota para Romi<textarea class="in" data-note="' + pid + '" style="min-height:70px" placeholder="Ej: Informe listo el viernes">' + esc(p.fiore_note || '') + '</textarea></label>';
        h += '<div class="g2"><button class="btn line" data-act="note" data-id="' + pid + '">Guardar nota</button><button class="btn go" data-act="zip" data-id="' + pid + '">' + I.down + 'Descargar todo</button></div>';
        h += '</div>';
      }
    }
    return h + '</article>';
  }).join('');
}
$('kindF').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; kindF = b.dataset.v; for (const c of $('kindF').children) c.classList.toggle('on', c === b); renderIng(); });
$('ingList').addEventListener('focusout', () => { if (deferRender) { deferRender = false; setTimeout(renderIng, 50); } });
$('ingList').addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b || !sb) return; const id = b.dataset.id, p = props.find(x => x.id === id); if (!p) return;
  if (b.dataset.act === 'tg') { open[id] = !open[id]; renderIng(); return; }
  if (b.dataset.act === 'step') {
    const v = +b.dataset.v; const { error } = await sb.from('props').update({ step: v, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) toast('No se pudo actualizar.'); else { p.step = v; buzz(); renderIng(); toast('Paso actualizado. Romi ya lo ve.'); }
  }
  if (b.dataset.act === 'note') {
    const ta = document.querySelector('textarea[data-note="' + CSS.escape(id) + '"]'); const v = ta ? ta.value.trim().slice(0, 1000) : '';
    const { error } = await sb.from('props').update({ fiore_note: v, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) toast('No se pudo guardar la nota.'); else { p.fiore_note = v; toast('Nota guardada.'); renderIng(); }
  }
  if (b.dataset.act === 'zip') zipAll(p, b);
  if (b.dataset.act === 'lb') openLb(p, +b.dataset.i);
  if (b.dataset.act === 'edit') editProp(p);
  if (b.dataset.act === 'del') delProp(p);
  if (b.dataset.act === 'redit') startEdit(p);
  if (b.dataset.act === 'rdel') delRomi(p);
});

const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(u) { let c = 0xFFFFFFFF; for (let i = 0; i < u.length; i++) c = CRC[(c ^ u[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function makeZip(files) {
  const enc = new TextEncoder(), parts = [], cen = []; let off = 0;
  for (const f of files) {
    const name = enc.encode(f.name), data = f.data, crc = crc32(data);
    const h = new DataView(new ArrayBuffer(30)); h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint32(14, crc, true); h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, name.length, true);
    parts.push(h.buffer, name, data);
    const c = new DataView(new ArrayBuffer(46)); c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, data.length, true); c.setUint16(28, name.length, true); c.setUint32(42, off, true);
    cen.push(c.buffer, name); off += 30 + name.length + data.length;
  }
  const size = cen.reduce((s, x) => s + (x.byteLength || x.length), 0);
  const e = new DataView(new ArrayBuffer(22)); e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, size, true); e.setUint32(16, off, true);
  return new Blob([...parts, ...cen, e.buffer], { type: 'application/zip' });
}
async function grab(path) { const { data, error } = await sb.storage.from(BUCKET).download(path); if (error || !data) throw error || 0; return new Uint8Array(await data.arrayBuffer()); }
const ext = p => p.split('/').pop().split('.').pop();
async function zipAll(p, btn) {
  btn.disabled = true; const old = btn.innerHTML; btn.textContent = 'Armando…';
  try {
    const files = [], photos = (p.photos || []).filter(okPath);
    for (let i = 0; i < photos.length; i++) { try { files.push({ name: 'fotos/foto-' + String(i + 1).padStart(2, '0') + '.' + ext(photos[i]), data: await grab(photos[i]) }); } catch (e) {} }
    const docs = p.docs || {};
    for (const k in docs) { if (!docs[k] || !okPath(docs[k].path)) continue; try { files.push({ name: 'papeles/' + (DOCS[+k] || 'papel').normalize('NFD').replace(/[^\w ]/g, '').replace(/ /g, '-') + '.' + ext(docs[k].path), data: await grab(docs[k].path) }); } catch (e) {} }
    if (okPath(p.audio)) { try { files.push({ name: 'audio.' + ext(p.audio), data: await grab(p.audio) }); } catch (e) {} }
    const info = ['Propiedad: ' + p.dir, 'Para: ' + (p.purpose === 'tasar' ? 'Tasar' : 'Subir a Tokko'), 'Operación: ' + p.op, 'Cargada: ' + new Date(p.created_at).toLocaleString('es-AR'), '', p.nota ? 'Nota de Romi:\n' + p.nota : ''].join('\n');
    files.push({ name: 'info.txt', data: new TextEncoder().encode(info) });
    const url = URL.createObjectURL(makeZip(files)); const a = document.createElement('a');
    a.href = url; a.download = 'romi-go-' + (String(p.dir).normalize('NFD').replace(/[^\w ]/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || 'propiedad') + '.zip';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000);
    toast('Listo, quedó en tu carpeta Descargas.');
  } catch (e) { toast('No se pudo descargar. Probá de nuevo.'); }
  btn.disabled = false; btn.innerHTML = old;
}

const okUrl = u => typeof u === 'string' && /^https:\/\/[^\s"'<>]+$/.test(u);
function renderPub() {
  $('pubAdd').hidden = !owner;
  const list = pubs.filter(l => opF === 'Todas' || l.op === opF);
  $('pubList').innerHTML = list.length ? list.map((l, i) => {
    const href = okUrl(l.url) ? esc(l.url) : 'https://coldwellbankerseniority.com/a/romina-schiber';
    const img = okUrl(l.foto) ? '<img loading="lazy" alt="' + esc(l.titulo) + '" src="' + esc(l.foto) + '" onerror="this.remove()">' : '';
    const card = '<a class="pc" href="' + href + '" target="_blank" rel="noopener"><div class="im">' + img + '<span class="op' + (l.op === 'Alquiler' ? ' al' : '') + '">' + esc(l.op) + '</span>' + (l.precio ? '<span class="pr">' + esc(l.precio) + '</span>' : '') + '</div><div class="bd"><h3>' + esc(l.titulo) + '</h3><div class="z">' + I.pin + esc(l.zona) + (l.m2 ? ' · ' + esc(l.m2) : '') + '</div></div></a>';
    const acts = owner ? '<div class="acts"><button data-pact="edit" data-id="' + esc(l.id) + '">Editar</button><button class="del" data-pact="del" data-id="' + esc(l.id) + '">Eliminar</button></div>' : '';
    return '<div class="pcw" style="animation-delay:' + Math.min(i * .04, .5) + 's">' + card + acts + '</div>';
  }).join('') : '<div class="empty"><b>No hay propiedades</b>' + (owner ? 'Tocá "Agregar" para sumar una.' : 'Todavía no hay publicadas.') + '</div>';
  const cnt = { Todas: pubs.length, Venta: pubs.filter(l => l.op === 'Venta').length, Alquiler: pubs.filter(l => l.op === 'Alquiler').length };
  for (const c of $('opF').children) { c.classList.toggle('on', c.dataset.v === opF); c.innerHTML = esc(c.dataset.v) + '<em>' + cnt[c.dataset.v] + '</em>'; }
}
async function loadPubs() {
  if (!sb) return;
  const { data, error } = await sb.from('pubs').select('*').order('orden', { ascending: true }).order('created_at', { ascending: true });
  if (error || !Array.isArray(data)) return;
  pubs = data; if (tab === 'publicadas') renderPub(); syncHero();
}
$('pubList').addEventListener('click', e => {
  const b = e.target.closest('[data-pact]'); if (!b) return; e.preventDefault();
  const l = pubs.find(x => x.id === b.dataset.id); if (!l) return;
  if (b.dataset.pact === 'edit') editPub(l); else delPub(l);
});
$('pubAdd').addEventListener('click', () => editPub(null));

/* SHEET */
function openSheet(html) { $('sheet').innerHTML = '<div class="grab"></div>' + html; $('sheetbg').hidden = false; const f = $('sheet').querySelector('input'); if (f) setTimeout(() => f.focus(), 250); }
function closeSheet() { $('sheetbg').hidden = true; $('sheet').innerHTML = ''; }
$('sheetbg').addEventListener('click', e => { if (e.target === $('sheetbg') || e.target.closest('[data-close]')) closeSheet(); });
const fld = (id, label, val, ph, extra) => '<label class="f">' + label + '<input class="in" id="' + id + '" value="' + esc(val || '') + '" placeholder="' + esc(ph || '') + '" autocomplete="off"' + (extra || '') + '></label>';
const seg2 = (id, a, b, v) => '<div class="segc" id="' + id + '" data-v="' + esc(v) + '"><div class="pill" style="' + (v === b ? 'transform:translateX(100%)' : '') + '"></div><button type="button" class="' + (v === a ? 'on' : '') + '" data-v="' + a + '">' + a + '</button><button type="button" class="' + (v === b ? 'on' : '') + '" data-v="' + b + '">' + b + '</button></div>';
$('sheet').addEventListener('click', e => {
  const b = e.target.closest('.segc button'); if (!b) return;
  const g = b.parentElement; g.dataset.v = b.dataset.v;
  for (const x of g.querySelectorAll('button')) x.classList.toggle('on', x === b);
  g.querySelector('.pill').style.transform = b === g.querySelectorAll('button')[1] ? 'translateX(100%)' : '';
});

function editProp(p) {
  openSheet('<h2>Editar ingreso</h2><p>Cambiá la dirección o para qué es.</p>' +
    fld('eCalle', 'Calle', p.calle || p.dir, 'Ej: Av. Santa Fe') +
    '<div class="g3">' + fld('eNum', 'Número', p.numero, '2300', ' inputmode="numeric"') + fld('ePiso', 'Piso', p.piso, '4') + fld('eDepto', 'Depto', p.depto, 'B') + '</div>' +
    seg2('eOp', 'Venta', 'Alquiler', p.op === 'Alquiler' ? 'Alquiler' : 'Venta') +
    seg2('ePur', 'Tasar', 'Tokko', p.purpose === 'tasar' ? 'Tasar' : 'Tokko') +
    '<label class="f">Nota de Romi<textarea class="in" id="eNota">' + esc(p.nota || '') + '</textarea></label>' +
    '<div class="g2"><button class="btn line" data-close>Cancelar</button><button class="btn go" id="eSave">Guardar</button></div>');
  $('eSave').onclick = async () => {
    const calle = $('eCalle').value.trim(), numero = $('eNum').value.trim(), piso = $('ePiso').value.trim(), depto = $('eDepto').value.trim();
    const dirTxt = [calle, numero].filter(Boolean).join(' ') + (piso ? ', ' + piso + '°' : '') + (depto ? ' ' + depto : '');
    const purpose = $('ePur').dataset.v === 'Tasar' ? 'tasar' : 'tokko';
    const upd = { calle, numero, piso, depto, dir: dirTxt || 'Sin dirección', op: $('eOp').dataset.v, purpose, nota: $('eNota').value.trim().slice(0, 4000), updated_at: new Date().toISOString() };
    if (purpose !== kindOf(p)) upd.step = 0;
    $('eSave').disabled = true;
    const { error } = await sb.from('props').update(upd).eq('id', p.id);
    if (error) { $('eSave').disabled = false; toast('No se pudo guardar.'); return; }
    Object.assign(p, upd); closeSheet(); renderIng(); toast('Ingreso actualizado.');
  };
}
function delProp(p) {
  openSheet('<h2>¿Eliminar este ingreso?</h2><p>' + esc(p.dir) + '</p><div class="note" style="margin:0">Se borran de la app la propiedad, sus fotos, papeles y audio. La carpeta que ya está en tu Drive no se toca. <b>No se puede deshacer.</b></div><div class="g2"><button class="btn line" data-close>Cancelar</button><button class="btn red" id="dOk">Sí, eliminar</button></div>');
  $('dOk').onclick = async () => {
    $('dOk').disabled = true; $('dOk').textContent = 'Eliminando…';
    const paths = [].concat(Array.isArray(p.photos) ? p.photos : [], Object.values(p.docs || {}).map(x => x && x.path), p.audio || []).filter(okPath);
    if (paths.length) await sb.storage.from(BUCKET).remove(paths);
    const { error } = await sb.from('props').delete().eq('id', p.id);
    if (error) { toast('No se pudo eliminar.'); $('dOk').disabled = false; $('dOk').textContent = 'Sí, eliminar'; return; }
    props = props.filter(x => x.id !== p.id); closeSheet(); renderIng(); syncHero(); toast('Ingreso eliminado.');
  };
}
function editPub(l) {
  const n = l || { titulo: '', zona: '', op: 'Venta', precio: '', m2: '', url: '', foto: '' };
  openSheet('<h2>' + (l ? 'Editar publicada' : 'Agregar publicada') + '</h2><p>Esto cambia solo lo que se ve en Romi Go, no la página de Coldwell Banker.</p>' +
    fld('pTit', 'Título', n.titulo, 'Ej: Depto 2 amb. con balcón') + fld('pZona', 'Zona o dirección', n.zona, 'Ej: Belgrano') +
    '<div class="g2">' + fld('pPre', 'Precio', n.precio, 'USD 120.000') + fld('pM2', 'Superficie', n.m2, '45 m²') + '</div>' +
    seg2('pOp', 'Venta', 'Alquiler', n.op === 'Alquiler' ? 'Alquiler' : 'Venta') +
    fld('pUrl', 'Link del aviso', n.url, 'https://…', ' type="url" inputmode="url"') + fld('pFoto', 'Link de la foto de portada (opcional)', n.foto, 'https://…', ' type="url" inputmode="url"') +
    '<div class="g2"><button class="btn line" data-close>Cancelar</button><button class="btn go" id="pSave">Guardar</button></div>');
  $('pSave').onclick = async () => {
    const row = { titulo: $('pTit').value.trim().slice(0, 120), zona: $('pZona').value.trim().slice(0, 120), precio: $('pPre').value.trim().slice(0, 40), m2: $('pM2').value.trim().slice(0, 30), op: $('pOp').dataset.v, url: $('pUrl').value.trim(), foto: $('pFoto').value.trim() };
    if (!row.titulo) { toast('Poné un título.'); return; }
    if (row.url && !okUrl(row.url)) { toast('El link tiene que empezar con https://'); return; }
    if (row.foto && !okUrl(row.foto)) { toast('El link de la foto tiene que empezar con https://'); return; }
    $('pSave').disabled = true;
    const q = l && !String(l.id).startsWith('local') ? sb.from('pubs').update(row).eq('id', l.id) : sb.from('pubs').insert(Object.assign({ orden: -Date.now() % 1000000000 }, row));
    const { error } = await q;
    if (error) { $('pSave').disabled = false; toast('No se pudo guardar.'); return; }
    closeSheet(); await loadPubs(); toast(l ? 'Publicada actualizada.' : 'Publicada agregada.');
  };
}
function delPub(l) {
  openSheet('<h2>¿Sacar esta publicada?</h2><p>' + esc(l.titulo) + '</p><div class="note" style="margin:0">Se saca solo de Romi Go. La página de Coldwell Banker no cambia.</div><div class="g2"><button class="btn line" data-close>Cancelar</button><button class="btn red" id="pdOk">Sí, sacar</button></div>');
  $('pdOk').onclick = async () => {
    $('pdOk').disabled = true;
    const { error } = await sb.from('pubs').delete().eq('id', l.id);
    if (error) { $('pdOk').disabled = false; toast('No se pudo sacar.'); return; }
    closeSheet(); pubs = pubs.filter(x => x.id !== l.id); renderPub(); syncHero(); toast('Listo, la sacamos de la lista.');
  };
}

/* LIGHTBOX */
let lbItems = [];
function openLb(p, start) {
  const photos = (Array.isArray(p.photos) ? p.photos : []).filter(x => okPath(x) && signed[x]).map((x, k) => ({ url: signed[x], cap: 'Foto ' + (k + 1) }));
  const docs = p.docs || {};
  const dimg = Object.keys(docs).filter(k => docs[k] && docs[k].isImg && signed[docs[k].path]).map(k => ({ url: signed[docs[k].path], cap: DOCS[+k] || 'Papel' }));
  lbItems = photos.concat(dimg); if (!lbItems.length) return;
  $('lbSc').innerHTML = lbItems.map(x => '<div class="sl"><img alt="' + esc(x.cap) + '" src="' + esc(x.url) + '"></div>').join('');
  $('lb').hidden = false; document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => { $('lbSc').scrollLeft = $('lbSc').clientWidth * Math.min(start, lbItems.length - 1); lbSync(); });
}
function lbIdx() { const w = $('lbSc').clientWidth || 1; return Math.round($('lbSc').scrollLeft / w); }
function lbSync() { const i = lbIdx(); $('lbCount').textContent = (i + 1) + ' de ' + lbItems.length; $('lbCap').textContent = (lbItems[i] || {}).cap || ''; }
function lbGo(d) { const sc = $('lbSc'); sc.scrollTo({ left: sc.clientWidth * Math.max(0, Math.min(lbItems.length - 1, lbIdx() + d)), behavior: 'smooth' }); }
function closeLb() { $('lb').hidden = true; document.body.style.overflow = ''; $('lbSc').innerHTML = ''; }
$('lbSc').addEventListener('scroll', () => { clearTimeout(lbSync.t); lbSync.t = setTimeout(lbSync, 60); });
$('lbClose').addEventListener('click', closeLb);
$('lbPrev').addEventListener('click', () => lbGo(-1));
$('lbNext').addEventListener('click', () => lbGo(1));
document.addEventListener('keydown', e => { if (!$('lb').hidden) { if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') lbGo(-1); if (e.key === 'ArrowRight') lbGo(1); } else if (!$('sheetbg').hidden && e.key === 'Escape') closeSheet(); });
$('opF').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; opF = b.dataset.v; renderPub(); });

$('login').addEventListener('submit', async e => {
  e.preventDefault(); if (!sb) return; $('lgBtn').disabled = true; $('lgMsg').textContent = 'Entrando…';
  const { error } = await sb.auth.signInWithPassword({ email: $('lgMail').value.trim(), password: $('lgPass').value });
  $('lgBtn').disabled = false; $('lgMsg').textContent = error ? 'Email o contraseña incorrectos.' : '';
});
$('logout').addEventListener('click', async () => { if (sb) await sb.auth.signOut(); });

if (sb) {
  sb.auth.onAuthStateChange((ev, session) => {
    const was = owner; owner = !!session;
    if (owner !== was) { signed = {}; loadProps(); }
    if (tab === 'ingresos') renderIng(); if (tab === 'publicadas') renderPub(); syncHero();
  });
  setInterval(() => { if (tab === 'ingresos' && !document.hidden) loadProps(); }, 30000);
}
window.addEventListener('hashchange', () => { if (location.hash === '#fiore') setTab('ingresos'); else if (tab === 'ingresos') renderIng(); });
renderCargar();
if (location.hash === '#fiore') setTab('ingresos');
loadProps(); loadPubs();
}
