{
const SB_URL = 'https://hbgjasazaqybkjdvvanm.supabase.co';
const SB_KEY = 'sb_publishable_gn_DBzMfkQrVZF_tqYP-qg_9uhkv0He';
const BUCKET = 'romigo';
const WA = '5491144243022';
const DOCS = ['Escritura', 'DNI del dueño', 'Autorización', 'Plano', 'Expensas', 'ABL'];
const STEPS = {
  tasar: ['Recibida', 'Visita agendada', 'Armando el informe', 'Tasación enviada'],
  tokko: ['Recibida', 'Revisando fotos y textos', 'Cargada en Tokko', 'Publicada en portales']
};
const PUB = [
['Depto 3 amb. reciclado','Club de Campo Hacoaj','Venta','USD 155.000','63 m²','venta-departamento-3-amb-reciclado-club-de-campo-hacoaj--4396899'],
['Depto 1 dorm. full amenities','Palermo Hollywood','Venta','USD 211.640','57 m²','venta-dpto-1-habitacion-full-amenities-palermo-hollywood--4617254'],
['Galpón industrial','Avellaneda','Venta','USD 490.000','930 m²','galpon-industrial-con-excelente-conectividad-y-rapido-acceso-a-autopistas-avellaneda--4663040'],
['Oficina premium, 2 cocheras','Lima al 200','Venta','USD 250.000','297 m²','venta-oficina-premium-29735m2-vista-abierta-hacia-av-9-de-julio-2-cocheras--4663620'],
['Cochera','Recoleta','Venta','USD 15.000','15 m²','cochera-excelente-ubicacion-recoleta--4689870'],
['Oficina 300 m², vista a 9 de Julio','Lima al 200','Alquiler','$3.000.000','300 m²','alquiler-oficina-300m2-vista-abierta-hacia-av-9-de-julio--4695605'],
['Oficina 170 m², vista a 9 de Julio','Lima al 200','Alquiler','$1.800.000','170 m²','alquiler-oficina-170m2-vista-abierta-hacia-av-9-de-julio--4695606'],
['Oficina 130 m²','Monserrat','Alquiler','$1.200.000','130 m²','alquiler-oficina-130m2-monserrat--4695607'],
['Depto 3 dorm. c/ dependencia','Belgrano','Venta','USD 279.000','102 m²','dpto-3-habitaciones-c-dependencia-patio-balcon-belgrano--4699816'],
['Depto 2 dorm. c/ dependencia','Belgrano','Venta','USD 279.000','102 m²','dpto-2-habitaciones-c-dependencia-patio-balcon-belgrano--4700532'],
['Depto 5 dorm. con cochera','Belgrano','Venta','USD 799.000','263 m²','departamento-5-habitaciones-con-dependencia-y-cochera-belgrano--4704558'],
['Galpón industrial','Avellaneda','Alquiler','$5.000.000','930 m²','alquiler-galpon-industrial-avellaneda--4707231'],
['Depto 1 dorm.','Belgrano','Venta','USD 94.000','40 m²','venta-departamento-1-habitacion-belgrano--4711811'],
['Depto 1 dorm. a estrenar','Caballito','Venta','USD 109.000','44 m²','venta-dpto-1-habitacion-a-estrenar-caballito--4724844'],
['Depto 2 amb.','Caballito','Venta','USD 89.900','44 m²','departamento-2-ambientes-caballito--4724845'],
['Local comercial','Villa Crespo','Alquiler','$3.300.000','146 m²','alquiler-local-comercial-villa-crespo--4725638'],
['Oficina 300 m², vista a 9 de Julio','Lima al 200','Venta','USD 285.000','300 m²','venta-oficina-300m2-vista-abierta-hacia-av-9-de-julio--4725639']];

const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const okPath = p => typeof p === 'string' && /^[A-Za-z0-9/_.-]{3,200}$/.test(p) && !p.includes('..');
const sb = window.supabase ? window.supabase.createClient(SB_URL, SB_KEY) : null;
let owner = false, tab = 'cargar', kindF = 'todas', opF = 'Todas', props = [], deferRender = false, signed = {};

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
function blank() { return { id: newId(), purpose: 'tokko', op: 'Venta', calle: '', numero: '', piso: '', depto: '', nota: '', photos: [], docs: {}, audio: null }; }
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

function toast(t) { const el = $('toast'); el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => el.hidden = true, 3500); }
function dir() { return [d.calle.trim(), d.numero.trim()].filter(Boolean).join(' ') + (d.piso.trim() ? ', ' + d.piso.trim() + '°' : '') + (d.depto.trim() ? ' ' + d.depto.trim() : ''); }
function pending() { return d.photos.filter(p => p.status === 'up').length + Object.values(d.docs).filter(x => x.status === 'up').length + (d.audio && d.audio.status === 'up' ? 1 : 0); }
function doneCount() { return 1 + (d.calle.trim() ? 1 : 0) + (d.photos.some(p => p.path) ? 1 : 0) + ((d.audio && d.audio.path) || d.nota.trim() ? 1 : 0) + Object.values(d.docs).filter(x => x.path).length; }

function syncHero() {
  const ring = $('ring');
  if (tab === 'cargar') {
    const n = doneCount(), f = 10 - n;
    $('hSmall').textContent = 'Hola, Romi'; $('hTitle').textContent = 'Nueva propiedad';
    $('hSub').textContent = f === 0 ? 'Está todo, ya podés avisar' : 'Te faltan ' + f + ' cosas';
    ring.hidden = false; $('arc').setAttribute('stroke-dashoffset', (163.4 * (1 - n / 10)).toFixed(1)); $('ringTxt').textContent = n + '/10';
  } else if (tab === 'ingresos') {
    ring.hidden = true; $('hSmall').textContent = owner ? 'Panel de Fiore' : 'Lo que le pasaste a Fiore';
    $('hTitle').textContent = owner ? 'Ingresos de Romi' : 'Mis ingresos'; $('hSub').textContent = props.length ? props.length + (props.length === 1 ? ' propiedad' : ' propiedades') : '';
  } else {
    ring.hidden = true; $('hSmall').textContent = PUB.length + ' propiedades en tu página'; $('hTitle').textContent = 'Publicadas'; $('hSub').textContent = '';
  }
}
function waLink() {
  const p = d.purpose === 'tasar' ? 'Para tasar' : 'Para subir a Tokko', x = dir();
  return 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Fiore, te comparto nueva propiedad para subir o tasar.\n' + p + (x ? ' · ' + x : ''));
}
function syncSend() { $('send').href = waLink(); }
function syncChips(box, val) { for (const b of $(box).querySelectorAll('.chip')) b.classList.toggle('on', b.dataset.v === val); }

function renderStrip() {
  $('phCount').textContent = d.photos.length ? d.photos.length + ' fotos' : '';
  $('strip').innerHTML = d.photos.map((p, i) => {
    const st = p.status === 'up' ? '<div class="st"><div class="spin"></div></div>' : p.status === 'err' ? '<div class="st">Error</div>' : '';
    const img = p.local ? '<img alt="Foto ' + (i + 1) + '" src="' + esc(p.local) + '">' : '<div class="st" style="background:#2A2D33">✓</div>';
    return '<div class="ph">' + img + st + '<button class="x" data-i="' + i + '" aria-label="Quitar foto ' + (i + 1) + '">×</button></div>';
  }).join('');
}
function renderDocs() {
  $('docs').innerHTML = DOCS.map((l, i) => {
    const x = d.docs[i], cls = x ? (x.status === 'err' ? 'err' : x.path ? 'done' : '') : '';
    const thumb = x && x.isImg && x.local ? '<img class="tn" alt="" src="' + esc(x.local) + '">' : '';
    const ic = x && x.status === 'up' ? '<div class="spin" style="border-color:#ddd;border-top-color:#FF5B2E"></div>'
      : x && x.path ? '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
      : '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
    return '<label class="tile tap ' + cls + '"><input class="hide" type="file" accept="image/*,application/pdf" data-i="' + i + '"><div class="dot">' + ic + '</div>' + thumb + '<span>' + esc(l) + (x && x.status === 'err' ? ' · reintentar' : '') + '</span></label>';
  }).join('');
}
function renderAudio() {
  const a = d.audio, rec = !!recorder;
  $('waves').hidden = !rec; $('recBtn').classList.toggle('pulse', rec);
  $('recBtn').setAttribute('aria-label', rec ? 'Terminar audio' : 'Grabar audio');
  $('recIco').innerHTML = rec ? '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>' : '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4"/>';
  $('audioTxt').textContent = rec ? 'Grabando… tocá para terminar' : !a ? 'Tocá para grabar un audio' : a.status === 'up' ? 'Guardando audio…' : a.status === 'err' ? 'No se pudo guardar. Probá de nuevo' : 'Audio guardado ✓';
  const pl = $('audioPlay');
  if (a && a.local && !rec) { if (pl.src !== a.local) pl.src = a.local; pl.hidden = false; } else { pl.hidden = true; }
}
function renderCargar() {
  for (const k of ['calle', 'numero', 'piso', 'depto', 'nota']) if ($(k).value !== d[k]) $(k).value = d[k];
  syncChips('purpose', d.purpose); syncChips('op', d.op); renderStrip(); renderDocs(); renderAudio(); syncSend(); syncHero();
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
  const path = d.id + '/' + folder + '/' + base + '-' + Math.random().toString(36).slice(2, 7) + '.' + extOf(b.type || file.type, file.name);
  let { error } = await sb.storage.from(BUCKET).upload(path, b, { contentType: (b.type || file.type || 'application/octet-stream').split(';')[0], upsert: false });
  if (error) { await new Promise(r => setTimeout(r, 1200)); ({ error } = await sb.storage.from(BUCKET).upload(path, b, { contentType: (b.type || 'application/octet-stream').split(';')[0], upsert: false })); }
  if (error) throw error;
  return path;
}
function upErr(e) { toast(e && e.message === 'big' ? 'Ese archivo es muy pesado (máx. 25 MB).' : 'No se pudo subir. Revisá la conexión y probá de nuevo.'); }

async function addPhotos(files) {
  for (const f of files) {
    const p = { local: URL.createObjectURL(f), status: 'up' }; d.photos.push(p); renderStrip(); syncHero();
    try { p.path = await upload(f, 'fotos', 'foto'); p.status = 'ok'; } catch (e) { p.status = 'err'; upErr(e); }
    renderStrip(); syncHero(); save();
  }
}
async function addDoc(i, f) {
  const x = { local: URL.createObjectURL(f), isImg: /^image\//.test(f.type), status: 'up' }; d.docs[i] = x; renderDocs();
  const slug = DOCS[i].normalize('NFD').replace(/[^\w ]/g, '').replace(/ /g, '-').toLowerCase();
  try { x.path = await upload(f, 'papeles', slug); x.status = 'ok'; } catch (e) { x.status = 'err'; upErr(e); }
  renderDocs(); syncHero(); save();
}
async function addAudio(f) {
  d.audio = { status: 'up', local: URL.createObjectURL(f) }; renderAudio();
  try { d.audio.path = await upload(f, 'audio', 'audio'); d.audio.status = 'ok'; } catch (e) { d.audio.status = 'err'; upErr(e); }
  renderAudio(); syncHero(); save();
}

let recorder = null, recTimer = null, recSecs = 0, recStream = null;
async function toggleRec() {
  if (recorder) { recorder.stop(); return; }
  if (!navigator.mediaDevices || !window.MediaRecorder) { $('inAudio').click(); return; }
  try {
    recStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) { toast('No se pudo usar el micrófono. Podés subir un audio o escribir la nota.'); return; }
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
  recorder.start(); renderAudio();
}

for (const k of ['calle', 'numero', 'piso', 'depto', 'nota']) $(k).addEventListener('input', e => { d[k] = e.target.value; syncSend(); syncHero(); save(); });
$('purpose').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; d.purpose = b.dataset.v; syncChips('purpose', d.purpose); syncSend(); save(); });
$('op').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; d.op = b.dataset.v; syncChips('op', d.op); save(); });
$('inCam').addEventListener('change', e => { addPhotos([...e.target.files]); e.target.value = ''; });
$('inGal').addEventListener('change', e => { addPhotos([...e.target.files]); e.target.value = ''; });
$('inAudio').addEventListener('change', e => { const f = e.target.files[0]; if (f) addAudio(f); e.target.value = ''; });
$('recBtn').addEventListener('click', toggleRec);
$('docs').addEventListener('change', e => { const i = e.target.dataset.i, f = e.target.files && e.target.files[0]; if (i != null && f) addDoc(+i, f); e.target.value = ''; });
$('strip').addEventListener('click', e => { const b = e.target.closest('.x'); if (!b) return; d.photos.splice(+b.dataset.i, 1); renderStrip(); syncHero(); save(); });

let sending = false;
$('send').addEventListener('click', async e => {
  e.preventDefault();
  if (sending) return;
  if (recorder) { toast('Primero terminá de grabar el audio.'); return; }
  const n = pending();
  if (n) { toast('Esperá un segundo, se están subiendo ' + n + ' archivo' + (n > 1 ? 's' : '') + '.'); return; }
  if (!sb) { toast('No hay conexión con el servidor. Revisá internet.'); return; }
  sending = true; const link = waLink();
  const docs = {}; for (const k in d.docs) if (d.docs[k].path) docs[k] = { path: d.docs[k].path, isImg: !!d.docs[k].isImg };
  const row = { id: d.id, dir: dir() || 'Sin dirección', calle: d.calle.trim(), numero: d.numero.trim(), piso: d.piso.trim(), depto: d.depto.trim(),
    op: d.op, purpose: d.purpose, nota: d.nota.trim().slice(0, 4000), photos: d.photos.filter(p => p.path).map(p => p.path), docs, audio: d.audio && d.audio.path ? d.audio.path : null };
  const { error } = await sb.from('props').insert(row);
  sending = false;
  if (error) { toast('No se pudo guardar. Revisá internet y volvé a tocar.'); return; }
  $('overTxt').textContent = 'Fiore ya tiene ' + row.dir + ' (' + (row.purpose === 'tasar' ? 'para tasar' : 'para subir a Tokko') + '), con ' + row.photos.length + ' fotos y ' + Object.keys(docs).length + ' de 6 papeles.';
  $('over').hidden = false;
  d = blank(); save(); renderCargar(); loadProps();
  setTimeout(() => { location.href = link; }, 600);
});
$('again').addEventListener('click', () => { $('over').hidden = true; setTab('cargar'); });
$('goIng').addEventListener('click', () => { $('over').hidden = true; setTab('ingresos'); });

function setTab(t) {
  tab = t; for (const b of $('tabs').querySelectorAll('.tab')) b.classList.toggle('on', b.dataset.t === t);
  $('v-cargar').hidden = t !== 'cargar'; $('sendbar').hidden = t !== 'cargar'; $('v-ingresos').hidden = t !== 'ingresos'; $('v-publicadas').hidden = t !== 'publicadas';
  if (t === 'ingresos') { renderIng(); loadProps(); } if (t === 'publicadas') renderPub();
  syncHero(); window.scrollTo(0, 0);
}
$('tabs').addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) setTab(b.dataset.t); });

function ago(ts) { const m = Math.round((Date.now() - new Date(ts).getTime()) / 60000); if (!(m >= 0)) return ''; if (m < 1) return 'recién'; if (m < 60) return 'hace ' + m + ' min'; const h = Math.round(m / 60); if (h < 24) return 'hace ' + h + ' h'; const dd = Math.round(h / 24); return dd === 1 ? 'ayer' : 'hace ' + dd + ' días'; }

let loading = false, loadedOnce = false;
async function loadProps() {
  if (!sb || loading) return; loading = true;
  const { data, error } = await sb.from('props').select('*').order('created_at', { ascending: false }).limit(300);
  loading = false;
  if (error) { if (tab === 'ingresos' && !loadedOnce) $('ingList').innerHTML = '<div class="empty">No se pudieron cargar los ingresos. Revisá internet.</div>'; return; }
  loadedOnce = true; props = data || [];
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
  if (!sb) { $('ingList').innerHTML = '<div class="empty">No hay conexión con el servidor.</div>'; return; }
  if (!loadedOnce) { $('ingList').innerHTML = '<div class="empty">Cargando…</div>'; return; }
  const list = props.filter(p => kindF === 'todas' || p.purpose === kindF);
  if (!list.length) { $('ingList').innerHTML = '<div class="empty">' + (props.length ? 'No hay ingresos de este tipo.' : 'Todavía no hay ingresos. Tocá Cargar para el primero.') + '</div>'; return; }
  $('ingList').innerHTML = list.map((p, i) => {
    const kind = p.purpose === 'tasar' ? 'tasar' : 'tokko', steps = STEPS[kind], st = Math.max(0, Math.min(3, +p.step || 0));
    const segs = steps.map((x, j) => '<i class="' + (j < st || st === 3 ? 'd' : j === st ? 'n' : '') + '"></i>').join('');
    const photos = (Array.isArray(p.photos) ? p.photos : []).filter(okPath), docs = p.docs && typeof p.docs === 'object' ? p.docs : {};
    const nd = Object.keys(docs).length, pid = esc(p.id);
    let h = '<article class="card rise" style="animation-delay:' + Math.min(i * .05, .5) + 's;gap:12px"><div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start"><div><div style="font-size:16px;font-weight:800">' + esc(p.dir) + '</div><div class="mut">Cargada ' + esc(ago(p.created_at)) + ' · ' + esc(p.op) + '</div></div><span class="badge k-' + kind + '">' + (kind === 'tasar' ? 'Tasación' : 'Tokko') + '</span></div>';
    h += '<div class="seg">' + segs + '</div><div style="display:flex;justify-content:space-between;gap:10px"><b style="font-size:15px">' + esc(steps[st]) + '</b><span class="mut" style="white-space:nowrap">Paso ' + (st + 1) + ' de 4</span></div>';
    h += '<div class="mut">' + photos.length + ' fotos · ' + nd + ' de 6 papeles' + (p.audio ? ' · audio' : '') + '</div>';
    if (p.fiore_note) h += '<div class="note"><b>Fiore:</b> ' + esc(p.fiore_note) + '</div>';
    if (owner) {
      if (p.nota) h += '<div class="note"><b>Romi:</b> ' + esc(p.nota) + '</div>';
      h += '<div class="row">' + steps.map((x, j) => '<button class="chip tap' + (j === st ? ' on' : '') + '" data-act="step" data-id="' + pid + '" data-v="' + j + '" style="height:38px;padding:0 12px;font-size:13px">' + esc(x) + '</button>').join('') + '</div>';
      h += '<label class="f">Nota para Romi<textarea class="in" data-note="' + pid + '" style="min-height:64px">' + esc(p.fiore_note || '') + '</textarea></label>';
      h += '<div class="row"><button class="btn line" data-act="note" data-id="' + pid + '">Guardar nota</button><button class="btn" data-act="zip" data-id="' + pid + '">Descargar todo (.zip)</button></div>';
      const ph = photos.filter(x => signed[x]);
      if (ph.length) h += '<div class="files">' + ph.map((x, k) => '<a href="' + esc(signed[x]) + '" target="_blank" rel="noopener" aria-label="Abrir foto ' + (k + 1) + '"><img loading="lazy" alt="Foto ' + (k + 1) + '" src="' + esc(signed[x]) + '"></a>').join('') + '</div>';
      const dl = Object.keys(docs).filter(k => docs[k] && signed[docs[k].path]).map(k => '<a class="flink" target="_blank" rel="noopener" href="' + esc(signed[docs[k].path]) + '">' + esc(DOCS[+k] || 'Papel') + '</a>').join('');
      if (dl) h += '<div class="g2">' + dl + '</div>';
      if (signed[p.audio]) h += '<audio controls preload="none" src="' + esc(signed[p.audio]) + '" style="width:100%"></audio>';
    }
    return h + '</article>';
  }).join('');
}
$('kindF').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; kindF = b.dataset.v; syncChips('kindF', kindF); renderIng(); });
$('ingList').addEventListener('focusout', () => { if (deferRender) { deferRender = false; setTimeout(renderIng, 50); } });
$('ingList').addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b || !sb) return; const id = b.dataset.id, p = props.find(x => x.id === id); if (!p) return;
  if (b.dataset.act === 'step') {
    const v = +b.dataset.v; const { error } = await sb.from('props').update({ step: v, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) toast('No se pudo actualizar.'); else { p.step = v; renderIng(); toast('Paso actualizado. Romi ya lo ve.'); }
  }
  if (b.dataset.act === 'note') {
    const ta = document.querySelector('textarea[data-note="' + CSS.escape(id) + '"]'); const v = ta ? ta.value.trim().slice(0, 1000) : '';
    const { error } = await sb.from('props').update({ fiore_note: v, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) toast('No se pudo guardar la nota.'); else { p.fiore_note = v; toast('Nota guardada.'); renderIng(); }
  }
  if (b.dataset.act === 'zip') zipAll(p, b);
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
const tail = p => p.split('/').pop();
async function zipAll(p, btn) {
  btn.disabled = true; const old = btn.textContent; btn.textContent = 'Armando el zip…';
  try {
    const files = [], photos = (p.photos || []).filter(okPath);
    for (let i = 0; i < photos.length; i++) { try { files.push({ name: 'fotos/foto-' + String(i + 1).padStart(2, '0') + '.' + tail(photos[i]).split('.').pop(), data: await grab(photos[i]) }); } catch (e) {} }
    const docs = p.docs || {};
    for (const k in docs) { if (!docs[k] || !okPath(docs[k].path)) continue; try { files.push({ name: 'papeles/' + (DOCS[+k] || 'papel').normalize('NFD').replace(/[^\w ]/g, '').replace(/ /g, '-') + '.' + tail(docs[k].path).split('.').pop(), data: await grab(docs[k].path) }); } catch (e) {} }
    if (okPath(p.audio)) { try { files.push({ name: 'audio.' + tail(p.audio).split('.').pop(), data: await grab(p.audio) }); } catch (e) {} }
    const info = ['Propiedad: ' + p.dir, 'Para: ' + (p.purpose === 'tasar' ? 'Tasar' : 'Subir a Tokko'), 'Operación: ' + p.op, 'Cargada: ' + new Date(p.created_at).toLocaleString('es-AR'), '', p.nota ? 'Nota de Romi:\n' + p.nota : ''].join('\n');
    files.push({ name: 'info.txt', data: new TextEncoder().encode(info) });
    const url = URL.createObjectURL(makeZip(files)); const a = document.createElement('a');
    a.href = url; a.download = 'romi-go-' + (String(p.dir).normalize('NFD').replace(/[^\w ]/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || 'propiedad') + '.zip';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (e) { toast('No se pudo descargar. Probá de nuevo.'); }
  btn.disabled = false; btn.textContent = old;
}

function renderPub() {
  $('pubList').innerHTML = PUB.filter(l => opF === 'Todas' || l[2] === opF).map((l, i) => '<a class="tap rise" style="animation-delay:' + (i * .03) + 's" href="https://coldwellbankerseniority.com/propiedad/' + esc(l[5]) + '" target="_blank" rel="noopener"><div class="ico"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg></div><div style="flex:1;display:flex;flex-direction:column;gap:2px"><div class="ttl">' + esc(l[0]) + '</div><div class="mut">' + esc(l[1]) + ' · ' + esc(l[4]) + '</div><div style="display:flex;gap:8px;align-items:center"><span class="price">' + esc(l[3]) + '</span><span class="op">' + esc(l[2]) + '</span></div></div><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A8F98" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></a>').join('');
}
$('opF').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; opF = b.dataset.v; syncChips('opF', opF); renderPub(); });

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
    if (tab === 'ingresos') renderIng(); syncHero();
  });
  setInterval(() => { if (tab === 'ingresos' && !document.hidden) loadProps(); }, 30000);
}
window.addEventListener('hashchange', () => { if (location.hash === '#fiore') setTab('ingresos'); else if (tab === 'ingresos') renderIng(); });
renderCargar();
if (location.hash === '#fiore') setTab('ingresos');
loadProps();
}
