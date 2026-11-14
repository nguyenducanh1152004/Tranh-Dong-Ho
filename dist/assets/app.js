(() => {
  const C = window.PORTFOLIO;
  const A = window.Art;
  const { cover, icon, seal } = A;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const smooth = (a, b, t) => { const x = clamp((t - a) / (b - a)); return x * x * (3 - 2 * x); };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mỗi mục in trên một tờ giấy nhuộm khác nhau; mục dự án là tấm chàm.
  const SECTIONS = [
    { key: 'about', title: 'Về mình', paper: A.C.hong },
    { key: 'skills', title: 'Kỹ năng', paper: A.C.xanh },
    { key: 'projects', title: 'Dự án', paper: A.C.cham },
    { key: 'experience', title: 'Kinh nghiệm', short: 'Việc làm', paper: A.C.vang },
    { key: 'contact', title: 'Liên hệ', paper: A.C.hong }
  ];
  const sampleNote = C.sampleContent ? '<p class="sample-note" data-r="rise">Nội dung minh họa — sẽ được thay bằng dự án và số liệu thật.</p>' : '';
  const HERO_PAPER = A.C.vang;

  /* ---------- tách chữ để chạy theo cuộn ---------- */
  function chars(text) {
    let i = 0;
    const html = text.normalize('NFC').split(' ').map(w =>
      `<span class="w">${[...w].map(c => `<span class="ch" style="--i:${i++}">${esc(c)}</span>`).join('')}</span>`
    ).join(' ');
    return `<span class="chars" aria-hidden="true" style="--n:${i}">${html}</span>`;
  }
  function words(text) {
    const list = text.split(/\s+/);
    return { n: list.length, html: list.map((w, i) => `<span class="wd" style="--i:${i}">${esc(w)}</span>`).join(' ') };
  }
  // Tiêu đề đặt trong ô đề chữ có viền kép, như ô thơ trên tranh.
  const title = (id, text) => `<h2 id="${id}" class="title" data-r="carve" aria-label="${esc(text)}">${chars(text)}</h2>`;
  const lead = text => { const w = words(text); return `<p class="lead" data-r data-len=".7" aria-label="${esc(text)}" style="--n:${w.n}"><span aria-hidden="true">${w.html}</span></p>`; };
  const chips = (list, cls = '') => `<ul class="chips ${cls}" data-r="pop">${list.map((t, i) => `<li style="--i:${i}">${esc(t)}</li>`).join('')}</ul>`;
  const cloudAt = (cls, speed) => `<div class="cloud-wrap ${cls}" data-par="${speed}" aria-hidden="true">${A.cloud()}</div>`;

  /* ---------- dữ liệu cơ bản ---------- */
  $$('[data-bind]').forEach(el => { el.textContent = C[el.dataset.bind] || ''; });
  $('.hero-name').setAttribute('aria-label', C.name);
  $('.hero-name').innerHTML = chars(C.name);
  $('.hero-art').innerHTML = A.carp();
  $('.hero-waves').innerHTML = A.waveBand();
  $('.hero-seal').innerHTML = seal('ĐA', 'lg');
  $('.nav').innerHTML = SECTIONS.map(s => `<a href="#${s.key}" data-key="${s.key}" aria-label="${s.title}" style="--dye:${s.paper}"><i></i><span class="lbl-long">${s.title}</span><span class="lbl-short" aria-hidden="true">${s.short || s.title}</span></a>`).join('');

  /* ---------- nội dung các mục ---------- */
  const views = {
    about() {
      const a = C.about;
      return `${cloudAt('c-a1', 0.35)}${cloudAt('c-a2', -0.2)}
      <div class="split">
        <div class="split-main">
          ${title('about-title', 'Về mình')}
          ${lead(a.intro)}
          <p class="body" data-r="rise">${esc(a.more)}</p>
          <ul class="stats">${a.stats.map((s, i) => `<li data-r="stamp" style="--d:${i}"><b data-count="${esc(s.value)}">${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join('')}</ul>

          <h3 class="sub" data-r="rise">Hành trình</h3>
          <ol class="tl" data-r data-len="h">${a.story.map(s => `<li data-r="stamp"><time>${esc(s.year)}</time><p>${esc(s.text)}</p></li>`).join('')}</ol>

          <h3 class="sub" data-r="rise">Mình làm việc thế nào</h3>
          <ul class="rows">${a.values.map(v => `<li data-r="rise">${icon(v.icon)}<div><b>${esc(v.title)}</b><p>${esc(v.text)}</p></div></li>`).join('')}</ul>

          <dl class="facts" data-r="rise">${a.facts.map(f => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('')}</dl>

          <h3 class="sub" data-r="rise">Lúc này</h3>
          <ul class="rows rows-tight">${a.now.map(n => `<li data-r="rise">${icon(n.icon)}<div><b>${esc(n.label)}</b><p>${esc(n.value)}</p></div></li>`).join('')}</ul>
          ${chips(a.hobbies)}
        </div>
        <aside class="split-art" data-r data-len=".75" data-start="1"><div class="sticky-art">${A.lotus()}</div></aside>
      </div>`;
    },
    skills() {
      return `${cloudAt('c-s1', 0.3)}
      <div class="wide">
        ${title('skills-title', 'Kỹ năng')}
        ${lead('Từ giao diện đến API, cơ sở dữ liệu và hạ tầng — mình làm trọn một sản phẩm web.')}
        <ul class="rows rows-2">${C.services.map(s => `<li data-r="rise">${icon(s.icon)}<div><b>${esc(s.title)}</b><p>${esc(s.text)}</p></div></li>`).join('')}</ul>

        <h3 class="sub" data-r="rise">Công nghệ</h3>
        <div class="groups">${C.skills.map(g => `<div class="group">
          <div class="group-head" data-r="rise"><b>${esc(g.group)}</b><p>${esc(g.desc)}</p></div>
          <ul class="meters" data-r data-len=".55">${g.items.map((s, i) => `<li style="--d:${i}">
            <span class="m-name">${esc(s.name)}</span>
            <span class="m-bar" role="img" aria-label="Mức ${s.level} trên 5">${[0, 1, 2, 3, 4].map(k => `<i class="${k < s.level ? 'on' : ''}" style="--k:${k}"></i>`).join('')}</span>
            <span class="m-yr">${s.years} năm</span>
          </li>`).join('')}</ul>
        </div>`).join('')}</div>

        <div class="pair">
          <div><h3 class="sub" data-r="rise">Kỹ năng mềm</h3>${chips(C.softSkills)}</div>
          <div><h3 class="sub" data-r="rise">Đang học</h3>${chips(C.learning, 'chips-dash')}</div>
        </div>

        <h3 class="sub" data-r="rise">Quy trình</h3>
        <ol class="process" data-r data-len=".8">${C.process.map((p, i) => `<li style="--d:${i}"><span class="step">${seal(String(i + 1), 'sm')}</span><b>${esc(p.title)}</b><p>${esc(p.text)}</p></li>`).join('')}</ol>
      </div>`;
    },
    projects() {
      return `<div class="pin">
        <div class="pin-head">
          ${title('projects-title', 'Dự án')}
          <p class="pin-meta" data-r="rise"><b class="pin-count">01 / ${String(C.projects.length).padStart(2, '0')}</b> Cuộn để lật qua ${C.projects.length} bản in</p>
          ${sampleNote}
        </div>
        <ul class="track">${C.projects.map((p, i) => `<li class="card">
          <button class="card-btn" data-project="${i}" aria-label="Xem chi tiết dự án ${esc(p.title)}">
            <span class="card-cover">${cover(p, i)}</span>
            <span class="card-body">
              <span class="card-title">${esc(p.title)}</span>
              <span class="card-meta">${esc(p.category)} · ${esc(p.year)}</span>
              <span class="card-text">${esc(p.tagline)}</span>
              <span class="card-tech">${p.tech.slice(0, 4).map(t => `<span>${esc(t)}</span>`).join('')}</span>
              <span class="card-more">Xem chi tiết ${icon('arrowRight')}</span>
            </span>
          </button>
        </li>`).join('')}</ul>
        <div class="pin-bar" aria-hidden="true"><i></i></div>
      </div>`;
    },
    experience() {
      return `${cloudAt('c-e1', 0.4)}${cloudAt('c-e2', -0.25)}
      <div class="mid">
        ${title('experience-title', 'Kinh nghiệm')}
        ${sampleNote}
        <ul class="highlights">${C.highlights.map((h, i) => `<li data-r="stamp" style="--d:${i}"><b data-count="${esc(h.value)}">${esc(h.value)}</b><span>${esc(h.label)}</span></li>`).join('')}</ul>
        <ol class="jobs">${C.experience.map(e => `<li class="job" data-r="unroll" data-len=".6">
          <h3>${esc(e.role)}</h3>
          <div class="job-top"><time>${esc(e.time)}</time><span class="job-type">${esc(e.type)}</span></div>
          <p class="job-org">${esc(e.org)} · ${esc(e.place)}</p>
          <p class="job-text">${esc(e.text)}</p>
          <ul class="points">${e.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
          <ul class="chips chips-sm">${e.tech.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        </li>`).join('')}</ol>

        <div class="pair">
          <div>
            <h3 class="sub" data-r="rise">Học vấn</h3>
            ${C.education.map(e => `<div class="edu" data-r="rise"><time>${esc(e.time)}</time><b>${esc(e.title)}</b><p class="job-org">${esc(e.org)}</p><p>${esc(e.text)}</p></div>`).join('')}
          </div>
          <div>
            <h3 class="sub" data-r="rise">Chứng chỉ & giải thưởng</h3>
            <ul class="certs">${C.certificates.map(c => `<li data-r="slide">${icon('award')}<div><b>${esc(c.title)}</b><p>${esc(c.org)}</p></div><span>${esc(c.year)}</span></li>`).join('')}</ul>
          </div>
        </div>
      </div>`;
    },
    contact() {
      const k = C.contact;
      return `${cloudAt('c-c1', 0.3)}
      <div class="contact">
        <div class="contact-head">
          <div class="big-seal" data-r="press" data-len=".55">${seal('ĐA', 'xl')}</div>
          <div>
            ${title('contact-title', 'Cùng làm gì đó')}
            ${lead('Bạn có ý tưởng, một sản phẩm cần người làm, hay chỉ muốn trò chuyện về web? Gửi mình vài dòng nhé.')}
          </div>
        </div>
        <div class="mail" data-r="rise">
          <a class="mail-link" href="mailto:${esc(C.email)}">${esc(C.email)}</a>
          <button class="btn btn-line btn-sm copy" type="button">${icon('copy')}Sao chép</button>
        </div>
        <div class="contact-grid">
          <div>
            <ul class="rows rows-tight">
              <li data-r="rise">${icon('clock')}<div><b>${esc(k.response)}</b><p>${esc(k.hours)}</p></div></li>
              <li data-r="rise">${icon('pin')}<div><b>Nơi làm việc</b><p>${esc(C.location)}</p></div></li>
            </ul>
            <ul class="open" data-r="pop">${k.open.map((o, i) => `<li class="${o.on ? 'on' : 'off'}" style="--i:${i}">${icon(o.on ? 'check' : 'minus')}${esc(o.label)}<span class="sr">${o.on ? ' — đang nhận' : ' — tạm chưa nhận'}</span></li>`).join('')}</ul>
            <h3 class="sub" data-r="rise">Câu hỏi thường gặp</h3>
            <div class="faq">${k.faq.map(f => `<details data-r="rise"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
            <p class="socials" data-r="rise">
              <a href="${esc(C.github)}" target="_blank" rel="noopener">${icon('github')}GitHub</a>
              <a href="${esc(C.linkedin)}" target="_blank" rel="noopener">${icon('linkedin')}LinkedIn</a>
              <a href="mailto:${esc(C.email)}">${icon('mail')}Email</a>
            </p>
          </div>
          <form class="form" novalidate data-r="unroll" data-len=".6">
            <p class="form-title">Gửi lời nhắn</p>
            <div class="field"><label for="f-name">Tên của bạn</label><input id="f-name" name="name" autocomplete="name" required></div>
            <div class="field"><label for="f-mail">Email</label><input id="f-mail" name="email" type="email" autocomplete="email" required></div>
            <fieldset class="field"><legend>Chủ đề</legend><div class="topics">${k.topics.map((t, i) => `<label><input type="radio" name="topic" value="${esc(t)}" ${i === 0 ? 'checked' : ''}><span>${esc(t)}</span></label>`).join('')}</div></fieldset>
            <div class="field"><label for="f-msg">Nội dung</label><textarea id="f-msg" name="message" rows="5" required></textarea></div>
            ${C.demo ? `<p class="form-demo">Form đang ở chế độ thử nghiệm nên chưa gửi được. Bạn email trực tiếp tới <a href="mailto:${esc(C.email)}">${esc(C.email)}</a> nhé.</p>` : ''}
            <p class="form-error" role="alert"></p>
            <button class="btn btn-ink" type="submit">${icon('send')}Gửi lời nhắn</button>
          </form>
        </div>
      </div>`;
    }
  };
  SECTIONS.forEach(s => { document.getElementById(s.key).innerHTML = views[s.key](); });

  /* ---------- toast ---------- */
  const toastEl = $('.toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3400);
  }

  /* ---------- hộp chi tiết dự án ---------- */
  const dialog = $('#project-dialog');
  let lastFocus = null;
  function openProject(i) {
    const p = C.projects[i];
    $('.dialog-body', dialog).innerHTML = `
      <div class="pd-cover">${cover(p, i)}</div>
      <div class="pd-main">
        <h3 id="pd-title">${esc(p.title)}</h3>
        <p class="card-meta">${esc(p.category)} · ${esc(p.year)}</p>
        <p class="pd-tag">${esc(p.tagline)}</p>
        <div class="pd-grid">
          <div><h4>Vấn đề</h4><p>${esc(p.problem)}</p></div>
          <div><h4>Giải pháp</h4><p>${esc(p.solution)}</p></div>
        </div>
        <h4>Tính năng chính</h4>
        <ul class="points">${p.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
        <p class="pd-result"><b>Kết quả</b>${esc(p.result)}</p>
        <ul class="chips chips-sm">${p.tech.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>`;
    lastFocus = document.activeElement;
    dialog.showModal();
    dialog.scrollTop = 0;
    requestAnimationFrame(() => dialog.classList.add('inked'));
  }
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { dialog.classList.remove('inked'); lastFocus && lastFocus.focus({ preventScroll: true }); });
  $$('[data-project]').forEach(b => b.addEventListener('click', () => openProject(+b.dataset.project)));

  /* ---------- liên hệ ---------- */
  $('.copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(C.email); toast('Đã sao chép ' + C.email); }
    catch { toast('Không sao chép được — email là ' + C.email); }
  });
  const form = $('.form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const err = $('.form-error', form);
    const bad = $$('input[required], textarea[required]', form).find(f => !f.checkValidity());
    $$('.field', form).forEach(f => f.classList.remove('invalid'));
    if (bad) {
      bad.closest('.field').classList.add('invalid');
      err.textContent = bad.type === 'email' && bad.value ? 'Email chưa đúng định dạng, ví dụ ten@gmail.com.' : 'Bạn điền giúp mình ô “' + bad.labels[0].textContent + '” nhé.';
      bad.focus();
      return;
    }
    err.textContent = '';
    const d = new FormData(form);
    if (C.demo) { toast('Đây là bản thử nghiệm nên lời nhắn chưa được gửi. Hãy email trực tiếp tới ' + C.email + '.'); return; }
    const body = `${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`;
    location.href = `mailto:${C.email}?subject=${encodeURIComponent('[' + d.get('topic') + '] Liên hệ từ portfolio')}&body=${encodeURIComponent(body)}`;
  });

  /* =====================================================================
     BỘ MÁY CUỘN — mọi chuyển động tính từ vị trí cuộn (đã làm mượt):
     cuộn tới đâu bản in hoàn thành tới đó, cuộn ngược thì tháo ngược lại.
     ===================================================================== */
  const root = document.documentElement;
  const hero = $('.hero');
  const sectionEls = SECTIONS.map(s => document.getElementById(s.key));
  const projectsEl = $('#projects');
  const pin = $('.pin', projectsEl), track = $('.track', projectsEl), cards = $$('.card', track);
  const pinBar = $('.pin-bar i', projectsEl), pinCount = $('.pin-count', projectsEl);
  const navLinks = $$('.nav a');
  const waveRows = $$('.wave-row');

  const docTop = el => { let y = 0; while (el) { y += el === pin ? 0 : el.offsetTop; el = el.offsetParent; } return y; };

  const items = $$('[data-r]').map(el => ({
    el, top: 0, h: 0, p: -1,
    start: parseFloat(el.dataset.start || '0.94'),
    lenAttr: el.dataset.len || '0.42',
    count: $$('[data-count]', el).map(c => {
      const m = c.dataset.count.match(/^([\d.,]+)(.*)$/);
      if (!m) return null;
      const dec = (m[1].split(',')[1] || '').length;
      return { c, n: parseFloat(m[1].replace(/\./g, '').replace(',', '.')), dec, suf: m[2], last: '' };
    }).filter(Boolean)
  }));
  const pars = $$('[data-par]').map(el => ({ el, speed: parseFloat(el.dataset.par), mid: 0 }));

  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const lum = ([r, g, b]) => [r, g, b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
  const INK_DARK = hex(A.C.den), INK_LIGHT = hex(A.C.diep);
  const papers = [{ rgb: hex(HERO_PAPER) }].concat(SECTIONS.map((s, i) => ({ rgb: hex(s.paper), el: sectionEls[i] })));
  papers.forEach(p => { p.dark = lum(p.rgb) < 0.2; });

  let vh = innerHeight, vw = innerWidth, docH = 1, pinDist = 0, pinTop = 0;

  function measure() {
    vh = innerHeight; vw = innerWidth;
    pinDist = Math.max(0, track.scrollWidth - vw);
    const h = Math.round(pinDist + vh * 1.7);
    if (projectsEl.style.height !== h + 'px') projectsEl.style.height = h + 'px';
    pinTop = docTop(projectsEl);
    items.forEach(it => {
      it.top = docTop(it.el);
      it.h = it.el.offsetHeight;
      it.len = it.lenAttr === 'h' ? it.h + vh * (it.start - 0.5) : parseFloat(it.lenAttr) * vh;
      it.p = -1;
    });
    pars.forEach(p => { p.mid = docTop(p.el) + p.el.offsetHeight / 2; });
    papers.forEach((p, i) => {
      if (!i) return;
      const top = docTop(p.el);
      // giấy tối (chàm) đổi muộn hơn để chữ của mục trước đã ra khỏi khung
      p.ts = top - vh * (p.dark ? 0.45 : 0.8);
      p.te = top - vh * (p.dark ? 0.05 : 0.3);
      // rời tấm chàm: mục sau bắt đầu ngay khi phần ghim nhả ra
      if (papers[i - 1].dark) { p.ts = top - vh * 0.9; p.te = top - vh * 0.5; }
    });
    docH = root.scrollHeight;
    last = -1;
  }

  function setP(it, p) {
    if (Math.abs(p - it.p) < 0.0005) return;
    it.p = p;
    it.el.style.setProperty('--p', p.toFixed(4));
    it.el.style.setProperty('--e', easeOut(p).toFixed(4));
    it.count.forEach(c => {
      const v = (c.n * easeOut(p)).toFixed(c.dec);
      const txt = (c.dec ? v.replace('.', ',') : v) + c.suf;
      if (txt !== c.last) { c.c.textContent = txt; c.last = txt; }
    });
  }

  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const rgb = c => `rgb(${c[0]},${c[1]},${c[2]})`;
  let paperNow = '', inkNow = '';

  let sy = scrollY, last = -1, activeKey = null;
  function update(y) {
    items.forEach(it => setP(it, reduced ? 1 : clamp((y + vh * it.start - it.top) / it.len)));

    // đầu trang: cá chép nhảy lên, chữ và sóng trôi theo cuộn
    const hp = reduced ? 0 : clamp(y / (vh * 0.9));
    hero.style.setProperty('--h', hp.toFixed(4));
    if (!reduced) waveRows.forEach((r, i) => { r.style.transform = `translate3d(${((i % 2 ? 1 : -1) * y * (0.18 + i * 0.07) - 80).toFixed(1)}px,${(hp * i * 14).toFixed(1)}px,0)`; });
    if (!reduced) pars.forEach(p => { p.el.style.transform = `translate3d(0,${((y + vh / 2 - p.mid) * p.speed).toFixed(1)}px,0)`; });

    // giấy nhuộm đổi màu theo mục; mực chuyển sáng khi sang tấm chàm
    let idx = 0, k = 1;
    for (let i = 1; i < papers.length; i++) if (y >= papers[i].ts) { idx = i; k = clamp((y - papers[i].ts) / (papers[i].te - papers[i].ts)); }
    const from = papers[Math.max(0, idx - 1)], to = papers[idx];
    const t = idx === 0 ? 1 : smooth(0, 1, k);
    const paper = rgb(mix(idx === 0 ? to.rgb : from.rgb, to.rgb, t));
    const fromInk = from.dark ? INK_LIGHT : INK_DARK, toInk = to.dark ? INK_LIGHT : INK_DARK;
    const ink = rgb(mix(fromInk, toInk, smooth(0.42, 0.58, t)));
    if (paper !== paperNow) { root.style.setProperty('--paper', paper); paperNow = paper; }
    if (ink !== inkNow) { root.style.setProperty('--ink', ink); inkNow = ink; root.classList.toggle('on-dark', to.dark && t > 0.5); }

    // dự án: dãy bản in chạy ngang khi mục được ghim; bản nào vào giữa thì khớp khuôn
    const pp = clamp((y - pinTop - vh * 0.3) / Math.max(1, pinDist));
    track.style.transform = `translate3d(${(-pp * pinDist).toFixed(1)}px,0,0)`;
    pinBar.style.transform = `scaleX(${pp.toFixed(4)})`;
    let closest = 0, best = Infinity;
    const entry = clamp((y - (pinTop - vh * 0.6)) / (vh * 0.9));
    cards.forEach((c, i) => {
      const cx = c.offsetLeft + c.offsetWidth / 2 - pp * pinDist;
      const dx = (cx - vw / 2) / vw;
      if (Math.abs(dx) < best) { best = Math.abs(dx); closest = i; }
      const print = reduced ? 1 : clamp(1 - Math.max(0, Math.abs(dx) - 0.12) * 2.2) * entry;
      c.style.setProperty('--p', print.toFixed(3));
      c.style.setProperty('--dx', reduced ? 0 : dx.toFixed(3));
    });
    pinCount.textContent = `${String(closest + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;

    // menu: mục đang xem + triện đóng dấu cho mục đã qua
    let cur = null;
    sectionEls.forEach((el, i) => { if (y >= papers[i + 1].ts + (papers[i + 1].te - papers[i + 1].ts) / 2) cur = SECTIONS[i].key; });
    navLinks.forEach((a, i) => a.classList.toggle('done', y >= papers[i + 1].te));
    if (cur !== activeKey) {
      activeKey = cur;
      navLinks.forEach(a => a.toggleAttribute('aria-current', a.dataset.key === activeKey));
      setHash(activeKey);
    }
    root.style.setProperty('--read', clamp(y / Math.max(1, docH - vh)).toFixed(4));
  }

  let hashTimer;
  function setHash(key) {
    clearTimeout(hashTimer);
    hashTimer = setTimeout(() => history.replaceState(null, '', key ? '#' + key : location.pathname), 300);
  }

  /* ---------- điều hướng bằng liên kết # ---------- */
  function targetY(id) {
    if (id === 'top' || !id) return 0;
    const el = document.getElementById(id);
    return el ? docTop(el) : null;
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const y = targetY(id);
    if (y == null) return;
    e.preventDefault();
    scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    const h = id !== 'top' && $('h2', document.getElementById(id));
    if (h) { h.setAttribute('tabindex', '-1'); setTimeout(() => h.focus({ preventScroll: true }), reduced ? 0 : 900); }
  });

  /* ---------- vòng lặp ---------- */
  let prevT = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min((now - prevT) / 1000, 0.05);
    prevT = now;
    const target = scrollY;
    // làm mượt bánh xe chuột (nhảy từng nấc) để bản in trôi chứ không giật
    sy = reduced ? target : sy + (target - sy) * (1 - Math.exp(-10 * dt));
    if (Math.abs(target - sy) < 0.05) sy = target;
    if (sy !== last) { update(sy); last = sy; }
  }

  measure();
  if (location.hash) {
    const y = targetY(location.hash.slice(1));
    if (y != null) { scrollTo(0, y); sy = y; }
  }
  update(sy);
  requestAnimationFrame(frame);

  // Mở trang: tờ vàng hoè được in một lần (khoảnh khắc duy nhất chạy theo thời gian).
  const reveal = () => { document.body.classList.remove('is-loading'); setTimeout(() => document.body.classList.add('printed'), 40); };
  Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 1200))]).then(reveal);

  let rt;
  const remeasure = () => { clearTimeout(rt); rt = setTimeout(() => { measure(); update(sy); }, 80); };
  addEventListener('resize', remeasure);
  new ResizeObserver(remeasure).observe($('main'));
  document.fonts && document.fonts.ready.then(remeasure);
})();
