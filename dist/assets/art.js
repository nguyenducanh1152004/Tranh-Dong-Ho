/* Tranh khắc gỗ vẽ bằng code, theo lối Đông Hồ.
   Mỗi hình được tách thành các "bản in": mỗi màu một bản, cuối cùng là bản nét đen.
   CSS dùng --p (0→1) để dập từng bản xuống: bản màu lệch khuôn rồi hội tụ, bản đen ép xuống sau cùng. */
window.Art = (() => {
  const C = {
    vang: '#f2c230', hong: '#e8697f', xanh: '#9cc56f', cham: '#23356e',
    son: '#c8352b', luc: '#3e7d4a', den: '#171310', diep: '#f7f0de'
  };
  // độ lệch khuôn của từng bản màu (đơn vị toạ độ SVG)
  const OFF = [[9, -6], [-8, 5], [6, 8], [-6, -8], [8, 4]];

  /* s(tag, attrs, fill, outline) → một hình; fill = null: chỉ có nét */
  const s = (tag, attrs, fill = null, outline = true, extra = '') => ({ tag, attrs, fill, outline, extra });

  function woodcut(shapes, { viewBox, cls = '', stroke = 5, label = '', key = C.den, defs = '' }) {
    const order = [];
    shapes.forEach(x => { if (x.fill && !order.includes(x.fill)) order.push(x.fill); });
    const np = order.length + 1;
    const plates = order.map((col, k) => {
      const [ox, oy] = OFF[k % OFF.length];
      const body = shapes.filter(x => x.fill === col).map(x => `<${x.tag} ${x.attrs} fill="${col}"/>`).join('');
      return `<g class="pl" style="--k:${k};--ox:${ox}px;--oy:${oy}px">${body}</g>`;
    }).join('');
    const lines = shapes.filter(x => x.outline).map(x => `<${x.tag} ${x.attrs} fill="none"${x.extra}/>`).join('');
    const keyPlate = `<g class="pl key" style="--k:${order.length};--ox:0px;--oy:0px" stroke="${key}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${lines}</g>`;
    const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
    return `<svg class="wc ${cls}" viewBox="${viewBox}" ${a11y} style="--np:${np}">${defs}${plates}${keyPlate}</svg>`;
  }

  /* ---------- cá chép vượt sóng (tranh đầu trang) ---------- */
  function carp() {
    const body = 'M300 120 C385 140 425 240 405 330 C390 400 345 452 300 472 C255 452 210 400 195 330 C175 240 215 140 300 120 Z';
    const scales = [];
    for (let r = 0; r < 8; r++) {
      const y = 262 + r * 26;
      for (let x = 196 + (r % 2) * 16; x < 404; x += 32) scales.push(`M${x} ${y} q16 20 32 0`);
    }
    const shapes = [
      s('path', 'd="M300 462 C262 500 222 538 182 566 C246 562 284 536 300 508 C316 536 354 562 418 566 C378 538 338 500 300 462 Z"', C.son),
      s('path', `d="${body}"`, C.son),
      s('path', 'd="M212 300 C156 296 122 330 108 380 C156 372 190 352 222 338 Z"', C.luc),
      s('path', 'd="M388 300 C444 296 478 330 492 380 C444 372 410 352 378 338 Z"', C.luc),
      s('path', 'd="M300 262 C316 310 316 384 300 446 C284 384 284 310 300 262 Z"', C.cham),
      s('path', 'd="M228 198 Q252 176 278 196 Q254 212 228 198 Z"', C.diep),
      s('path', 'd="M372 198 Q348 176 322 196 Q346 212 372 198 Z"', C.diep),
      s('circle', 'cx="256" cy="196" r="6"', C.den, false),
      s('circle', 'cx="344" cy="196" r="6"', C.den, false),
      s('path', 'd="M232 218 Q220 246 238 272 M368 218 Q380 246 362 272"', null),
      s('path', 'd="M286 140 Q300 150 314 140"', null),
      s('path', 'd="M282 132 q-26 -22 -54 -10 M318 132 q26 -22 54 -10"', null),
      s('path', `d="${scales.join(' ')}"`, null, true, ' clip-path="url(#carpBody)"'),
      s('path', 'd="M230 520 q20 -30 40 -12 M370 520 q-20 -30 -40 -12"', null)
    ];
    return woodcut(shapes, { viewBox: '60 80 480 520', cls: 'carp', label: 'Tranh cá chép vượt sóng', defs: `<defs><clipPath id="carpBody"><path d="${body}"/></clipPath></defs>` });
  }

  /* ---------- sóng nước: ba hàng vảy, mỗi hàng trôi một tốc độ ---------- */
  function waveBand() {
    const rows = [0, 1, 2].map(r => {
      const sh = [];
      for (let x = -80; x < 1840; x += 80) {
        sh.push(s('path', `d="M${x} 80 a40 40 0 0 1 80 0 Z"`, r % 2 ? C.luc : C.cham));
        sh.push(s('path', `d="M${x + 16} 80 a24 24 0 0 1 48 0 M${x + 30} 80 a10 10 0 0 1 20 0"`, null));
      }
      return `<div class="wave-row" style="--r:${r}">${woodcut(sh, { viewBox: '0 36 1760 46', stroke: 4 })}</div>`;
    }).join('');
    return `<div class="waves" aria-hidden="true">${rows}</div>`;
  }

  /* ---------- hoa sen ---------- */
  function lotus() {
    const petals = [-62, -34, 34, 62].map((a, i) => s('path', `d="M300 400 C250 330 262 230 300 170 C338 230 350 330 300 400 Z" transform="rotate(${a} 300 400)"`, i === 0 || i === 3 ? C.diep : C.son));
    return woodcut([
      s('path', 'd="M300 400 C296 470 300 520 304 580"', null),
      s('path', 'd="M304 520 C360 470 470 470 520 520 C470 560 360 562 304 520 Z"', C.luc),
      s('path', 'd="M296 470 C240 430 140 440 96 490 C150 520 240 512 296 470 Z"', C.luc),
      s('path', 'd="M500 520 L330 520 M120 488 L270 472"', null),
      ...petals,
      s('path', 'd="M300 400 C252 320 262 210 300 140 C338 210 348 320 300 400 Z"', C.son),
      s('path', 'd="M300 400 C276 340 280 270 300 230 C320 270 324 340 300 400 Z"', C.vang)
    ], { viewBox: '70 120 470 480', cls: 'lotus', label: 'Tranh hoa sen' });
  }

  /* ---------- mây cuộn ---------- */
  function cloud(col = C.diep) {
    return woodcut([
      s('path', 'd="M10 72 C0 50 16 26 42 30 C48 10 74 0 94 12 C110 0 140 6 146 28 C168 26 182 46 174 72 Z"', col),
      s('path', 'd="M46 60 a16 16 0 1 1 16 -16 a8 8 0 1 1 -8 8 M112 58 a14 14 0 1 0 -14 -14 a7 7 0 1 0 7 7"', null)
    ], { viewBox: '-6 -4 196 84', stroke: 4, cls: 'cloud' });
  }

  /* ---------- dấu triện ---------- */
  const seal = (text = 'ĐA', size = 'md') => `<span class="seal seal-${size}" aria-hidden="true"><span>${text}</span></span>`;

  /* ---------- ảnh bìa dự án theo lối khắc gỗ ---------- */
  const DYES = [C.vang, C.hong, C.xanh, C.diep];
  function cover(p, i) {
    const bg = DYES[i % DYES.length];
    const m = {
      browser: [
        s('rect', 'x="46" y="34" width="228" height="134" rx="6"', C.diep),
        s('path', 'd="M46 58 H274"', null),
        s('circle', 'cx="60" cy="46" r="4"', C.son), s('circle', 'cx="74" cy="46" r="4"', C.cham),
        s('rect', 'x="62" y="72" width="100" height="14"', C.den, false),
        s('rect', 'x="62" y="96" width="50" height="16"', C.son),
        s('rect', 'x="176" y="70" width="84" height="46"', C.cham),
        s('rect', 'x="62" y="124" width="58" height="32"', C.luc), s('rect', 'x="131" y="124" width="58" height="32"', C.cham), s('rect', 'x="200" y="124" width="58" height="32"', C.son)
      ],
      chat: [
        s('rect', 'x="52" y="36" width="140" height="34" rx="17"', C.diep),
        s('rect', 'x="124" y="82" width="144" height="48" rx="20"', C.cham),
        s('path', 'd="M142 100 H244 M142 114 H214"', null),
        s('rect', 'x="52" y="140" width="110" height="32" rx="16"', C.diep),
        s('circle', 'cx="80" cy="156" r="5"', C.son, false), s('circle', 'cx="98" cy="156" r="5"', C.son, false), s('circle', 'cx="116" cy="156" r="5"', C.son, false)
      ],
      kanban: [0, 1, 2].flatMap(c => [
        s('rect', `x="${44 + c * 80}" y="34" width="70" height="136"`, C.diep),
        ...[0, 1, 2].slice(0, c === 2 ? 2 : 3).map(r => s('rect', `x="${52 + c * 80}" y="${54 + r * 36}" width="54" height="28"`, [C.son, C.luc, C.cham][(c + r) % 3]))
      ]),
      phone: [
        s('rect', 'x="116" y="18" width="88" height="168" rx="14"', C.diep),
        s('circle', 'cx="160" cy="78" r="30"', C.son),
        s('circle', 'cx="160" cy="78" r="16"', C.vang),
        ...[14, 22, 18, 30, 26, 38].map((h, k) => s('rect', `x="${128 + k * 11}" y="${166 - h}" width="7" height="${h}"`, C.cham))
      ],
      terminal: [
        s('rect', 'x="40" y="30" width="240" height="144" rx="6"', C.cham),
        s('path', 'd="M40 52 H280"', null),
        ...[[58, 40], [58, 110], [74, 70], [58, 130], [74, 90]].map(([x, w], k) => s('rect', `x="${x}" y="${66 + k * 18}" width="${w}" height="8"`, k % 2 ? C.diep : C.vang, false)),
        s('rect', 'x="58" y="156" width="10" height="12"', C.son, false)
      ],
      orbit: [
        s('ellipse', 'cx="160" cy="102" rx="104" ry="32" transform="rotate(-16 160 102)"', null),
        s('circle', 'cx="160" cy="102" r="40"', C.son),
        s('path', 'd="M128 86 a40 40 0 0 1 40 -22"', null),
        s('circle', 'cx="258" cy="72" r="10"', C.cham), s('circle', 'cx="66" cy="132" r="7"', C.luc)
      ],
      map: [
        s('path', 'd="M0 70 Q160 40 320 112 M0 150 Q140 172 320 140 M90 0 L60 200 M230 0 L250 200"', null),
        s('path', 'd="M96 140 Q140 60 220 84"', null, true, ' stroke-dasharray="8 8"'),
        ...[[96, 140], [160, 70], [220, 84]].map(([x, y], k) => s('path', `d="M${x} ${y} c-14 -16 -14 -36 0 -40 c14 4 14 24 0 40 z"`, k === 2 ? C.son : C.cham))
      ],
      chart: [
        s('path', 'd="M40 150 L80 118 L120 130 L160 86 L200 100 L240 56 L280 70 L280 172 L40 172 Z"', C.luc),
        s('circle', 'cx="240" cy="56" r="8"', C.son),
        ...[0, 1, 2].map(k => s('rect', `x="${44 + k * 66}" y="24" width="56" height="20"`, [C.diep, C.cham, C.son][k]))
      ],
      wave: [
        ...Array.from({ length: 18 }, (_, k) => { const h = 18 + Math.abs(Math.sin(k * 0.7) * 56 + Math.sin(k * 1.9) * 18); return s('rect', `x="${48 + k * 13}" y="${(102 - h / 2).toFixed(0)}" width="8" height="${h.toFixed(0)}"`, k % 2 ? C.cham : C.son, false); }),
        s('circle', 'cx="160" cy="102" r="24"', C.diep),
        s('path', 'd="M152 90 L172 102 L152 114 Z"', C.son)
      ]
    }[p.cover] || [];
    return woodcut([s('rect', 'x="6" y="6" width="308" height="188"', bg, false), ...m, s('rect', 'x="10" y="10" width="300" height="180"', null)], { viewBox: '0 0 320 200', stroke: 4, cls: 'cover' });
  }

  /* ---------- icon một nét ---------- */
  const ICONS = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    sparkles: '<path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.9L12 18.5l-1.8-5.8-5.7-1.9L10.2 9z"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.6-4.4L4 8M4 3v5h5M4 13a8 8 0 0 0 14.6 4.4L20 16M20 21v-5h-5"/>',
    layout: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M9 20V9"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    server: '<rect x="3" y="4" width="18" height="7" rx="1"/><rect x="3" y="13" width="18" height="7" rx="1"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    hammer: '<path d="m14 7 3 3M3 21l9.5-9.5M12 4l8 8-3 3-8-8z"/>',
    learn: '<path d="M22 9 12 4 2 9l10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    minus: '<path d="M5 12h14"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="1"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>'
  };
  const icon = (name, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  return { C, carp, waveBand, lotus, cloud, seal, cover, icon };
})();
