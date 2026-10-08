(function () {
  'use strict';
  var C = window.CONFIG;
  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TZ = 'Africa/Maputo';

  /* ---------- utilitários ---------- */
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function partes(date, opts) {
    var o = {}, f = {};
    for (var k in opts) f[k] = opts[k];
    f.timeZone = TZ;
    new Intl.DateTimeFormat('pt-PT', f).formatToParts(date).forEach(function (p) { o[p.type] = p.value; });
    return o;
  }
  function fmtTel(n) { return String(n).replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3'); }
  function set(id, txt) { var e = $(id); if (e) e.textContent = txt; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }

  /* ---------- datas ---------- */
  var dFesta = new Date(C.dataFesta);
  var pf = partes(dFesta, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  var dataTexto = cap(pf.weekday) + ', ' + pf.day + ' de ' + cap(pf.month) + ' de ' + pf.year;
  var horaTexto = Number(pf.hour) + 'h' + pf.minute;
  var pp = partes(new Date(C.prazoRsvp), { weekday: 'long', day: 'numeric', month: 'long' });
  var prazoTexto = cap(pp.weekday) + ', ' + pp.day + ' de ' + cap(pp.month);

  /* ---------- convidado (vem do link: ?nome=Celia %26 Esposo) ---------- */
  var q = new URLSearchParams(location.search);
  var nome = '', plural = false;
  function T(s) {
    return s.replace(/\{convidar\}/g, plural ? 'vos convidar' : 'convidá-lo(a)')
            .replace(/\{tua\}/g, plural ? 'vossa' : 'sua')
            .replace(/\{voce\}/g, plural ? 'vocês' : 'você')
            .replace(/\{Confirma\}/g, plural ? 'Confirmem' : 'Confirme');
  }

  if (C.toquesTI) document.body.classList.add('com-ti');

  /* ---------- imagens ---------- */
  function img(id, src) {
    var e = $(id); if (!e) return;
    e.onerror = function () { e.style.visibility = 'hidden'; };
    e.src = src;
  }
  img('logo', C.logo);
  img('fotoFormal', C.fotoFormal);

  /* ---------- capa ---------- */
  set('capaUni', C.universidade);
  set('capaFac', C.faculdade);
  set('capaTitulo1', C.tituloLinha1);
  set('capaTitulo2', C.tituloLinha2);
  set('capaNome', C.nome);
  set('capaCurso', C.curso);
  set('capaAnos', C.anos);

  /* ---------- detalhes ---------- */
  set('dSemana', cap(pf.weekday));
  set('dDia', pf.day);
  set('dMes', cap(pf.month) + ' ' + pf.year);
  set('dHora', horaTexto);
  C.localRota.forEach(function (p) {
    var li = el('li', '', '<b></b>');
    li.querySelector('b').textContent = p.titulo;
    if (p.detalhe) { var em = el('em'); em.textContent = p.detalhe; li.appendChild(em); }
    $('dRota').appendChild(li);
  });
  /* ---------- mapa: abre a app de mapas do telemóvel ---------- */
  (function () {
    var M = C.mapa, btn = $('mapaBtn');
    var q = (M.lat && M.lng) ? (M.lat + ',' + M.lng) : M.consulta;
    var ua = navigator.userAgent;
    var ios = /iP(hone|ad|od)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var android = /Android/i.test(ua);
    if (ios) {
      btn.href = M.linkApple ? M.linkApple : (M.lat && M.lng) ? 'https://maps.apple.com/?ll=' + q + '&q=' + encodeURIComponent(M.nome)
                                  : 'https://maps.apple.com/?q=' + encodeURIComponent(M.consulta);
    } else if (android) {
      btn.href = 'geo:0,0?q=' + encodeURIComponent(M.lat && M.lng ? q + '(' + M.nome + ')' : M.consulta);
    } else {
      btn.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
      btn.target = '_blank'; btn.rel = 'noopener';
    }
  })();

  function contacto(c) {
    var a = el('a', 'contacto',
      '<span class="ic"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg></span><span><b></b><small></small></span>');
    a.href = 'tel:+258' + c.numero;
    a.querySelector('b').textContent = c.nome;
    a.querySelector('small').textContent = fmtTel(c.numero);
    if (c.etiqueta) {
      var op = el('span', 'op');
      op.textContent = c.etiqueta;
      a.lastChild.appendChild(op);
    }
    return a;
  }
  C.contactosDirecao.forEach(function (c, i) { var a = contacto(c); a.classList.add('reveal'); a.style.setProperty('--d', (i * .1) + 's'); $('contDirecao').appendChild(a); });
  C.contactosDuvidas.forEach(function (c, i) { var a = contacto(c); a.classList.add('reveal'); a.style.setProperty('--d', (i * .1) + 's'); $('contDuvidas').appendChild(a); });


  /* ---------- programa ---------- */
  C.programa.forEach(function (it) {
    var li = el('li', 'reveal');
    li.style.setProperty('--d', '.05s');
    var h = partes(new Date(dFesta.getTime() + it.minutos * 60000), { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    li.innerHTML = '<span></span><em></em>';
    li.querySelector('span').textContent = Number(h.hour) + 'h' + h.minute;
    li.querySelector('em').textContent = it.texto;
    $('progLista').appendChild(li);
  });

  /* ---------- jornada ---------- */
  C.estatisticas.forEach(function (s, i) {
    if (i > 0) {
      var op = el('span', 'op reveal');
      op.textContent = i === C.estatisticas.length - 1 ? '=' : '+';
      op.style.setProperty('--d', (i * .12 - .06) + 's');
      $('stats').appendChild(op);
    }
    var d = el('div', 'reveal', '<b data-count="' + Number(s.valor) + '">0</b><small></small>');
    d.querySelector('small').textContent = s.rotulo;
    d.style.setProperty('--d', (i * .12) + 's');
    $('stats').appendChild(d);
  });
  C.jornada.forEach(function (j) {
    var d = el('div', 'reveal', '<div class="j-ano"></div><div class="j-tit"></div><p class="j-txt"></p>');
    d.querySelector('.j-ano').textContent = j.ano;
    d.querySelector('.j-tit').textContent = j.titulo;
    d.querySelector('.j-txt').textContent = j.texto;
    d.style.setProperty('--d', '.05s');
    $('jornadaLista').appendChild(d);
  });

  /* ---------- agradecimento, presente, rsvp, final ---------- */
  set('agradTexto', C.agradecimento);
  set('presenteTexto', C.presenteTexto);
  set('presFisTitulo', C.presenteFisicoTitulo);
  set('presFisTexto', C.presenteFisicoTexto);
  set('presDigTitulo', C.presenteDigitalTitulo);
  set('presDigTexto', C.presenteDigitalTexto);
  set('presDigBotao', C.presenteDigitalBotao);
  set('rsvpPrazo', prazoTexto);
  C.rodape.forEach(function (linha) { var s = el('span'); s.textContent = linha; $('rodape').appendChild(s); });

  function copiar(txt, btn) {
    function ok() { var o = btn.textContent; btn.textContent = 'Copiado!'; setTimeout(function () { btn.textContent = o; }, 1600); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(ok, fallback);
    } else fallback();
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      ta.remove(); ok();
    }
  }
  [['M-Pesa', C.presente.mpesa], ['e-Mola', C.presente.emola]].forEach(function (p) {
    var c = el('div', 'pay-card', '<div><small></small><b></b><em></em></div><button class="btn" type="button">Copiar</button>');
    c.querySelector('small').textContent = p[0];
    c.querySelector('b').textContent = fmtTel(p[1]);
    c.querySelector('em').textContent = C.presente.titular;
    c.querySelector('button').addEventListener('click', function (e) { copiar(p[1], e.currentTarget); });
    $('pay').appendChild(c);
  });
  $('btnPresente').addEventListener('click', function () {
    var open = $('pay').classList.toggle('open');
    this.setAttribute('aria-expanded', open);
    this.querySelector('span').textContent = open ? 'Fechar' : C.presenteDigitalBotao;
  });

  function wa(txt) { return 'https://wa.me/' + C.whatsappRsvp + '?text=' + encodeURIComponent(txt); }
  /* tudo o que depende do convidado (singular ou plural com &) */
  function aplicarNome(n) {
    nome = String(n || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    plural = /&/.test(nome);
    if (nome) {
      $('guestLabel').style.display = '';
      set('guestLabel', plural ? 'Convidados:' : 'Convidado:');
      set('guestNome', nome);
    } else {
      $('guestLabel').style.display = 'none';
      set('guestNome', 'Estás convidado(a)');
    }
    set('abertura', T(C.abertura));
    set('rsvpTexto', T(C.rsvpTexto));
    set('fraseFinal', T(C.fraseFinal));
    set('despedida', T(C.despedida));
    var base = 'Olá ' + C.nomeCurto + ', ' + (nome ? 'aqui é ' + nome + '. ' : '');
    $('btnSim').href = wa(base + (plural ? 'Confirmamos a nossa presença' : 'Confirmo a minha presença') +
      ' na festa de graduação (' + dataTexto + ', ' + horaTexto + '). Parabéns pela conquista!');
    $('btnNao').href = wa(base + (plural ? 'Infelizmente não poderemos comparecer, mas deixamos os nossos parabéns pela conquista!'
                                         : 'Infelizmente não poderei comparecer, mas deixo os meus parabéns pela conquista!'));
  }
  window.aplicarNome = aplicarNome;
  aplicarNome(q.get('nome') || q.get('n') || '');

  /* ---------- contagem decrescente ---------- */
  var cd = { D: $('cdD'), H: $('cdH'), M: $('cdM'), S: $('cdS') }, last = {};
  function tick() {
    var ms = dFesta - Date.now();
    if (ms <= 0) { $('cdWrap').hidden = true; $('cdDone').hidden = false; return; }
    var s = Math.floor(ms / 1000);
    var v = { D: Math.floor(s / 86400), H: Math.floor(s % 86400 / 3600), M: Math.floor(s % 3600 / 60), S: s % 60 };
    for (var k in v) {
      var t = String(v[k]).padStart(2, '0');
      if (last[k] !== t) {
        last[k] = t; cd[k].textContent = t;
        if (!reduce) { cd[k].classList.remove('pop'); void cd[k].offsetWidth; cd[k].classList.add('pop'); }
      }
    }
  }
  tick(); setInterval(tick, 1000);

  /* ---------- revelar ao descer + contadores ---------- */
  function countUp(e) {
    var to = Number(e.dataset.count);
    if (reduce) { e.textContent = to; return; }
    var t0 = performance.now(), D = 1400;
    (function f(t) {
      var k = Math.min(1, (t - t0) / D);
      e.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }
  var io = new IntersectionObserver(function (es) {
    if (document.body.classList.contains('transicao')) return;     // espera as portas abrirem
    es.forEach(function (x) {
      if (!x.isIntersecting) return;
      x.target.classList.add('in');
      var c = x.target.querySelector('[data-count]');
      if (c) countUp(c);
      io.unobserve(x.target);
    });
  }, { threshold: .15 });
  function observarTudo() {
    document.querySelectorAll('.reveal:not(.in)').forEach(function (e) { io.observe(e); });
  }
  observarTudo();

  /* ---------- progresso do scroll + linhas do tempo (programa, jornada e local) ---------- */
  var tls = document.querySelectorAll('.tl');
  function onScroll() {
    var h = document.documentElement;
    var p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    $('prog').style.width = (p * 100) + '%';
    tls.forEach(function (t) {
      var r = t.getBoundingClientRect();
      var cs = getComputedStyle(t);
      var lt = parseFloat(cs.getPropertyValue('--lt')) || 6, lb = parseFloat(cs.getPropertyValue('--lb')) || 6;
      var fill = Math.max(0, Math.min(r.height, window.innerHeight * .65 - r.top));
      var linha = Math.max(1, r.height - lt - lb);
      t.style.setProperty('--p', Math.max(0, Math.min(1, (fill - lt) / linha)));
      // cada ponto acende quando a linha chega até ele
      Array.prototype.forEach.call(t.children, function (c) {
        c.classList.toggle('on', fill >= c.offsetTop + 20);
      });
    });
  }
  /* a linha do local termina exactamente no último ponto */
  function ajustarRota() {
    var r = $('dRota'), l = r.lastElementChild;
    if (!l) return;
    r.style.setProperty('--lb', Math.max(6, r.offsetHeight - (l.offsetTop + 19)) + 'px');
    onScroll();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', ajustarRota);
  ajustarRota();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustarRota);

  /* ---------- código a escrever (toque de TI) ---------- */
  if (C.toquesTI && !reduce) {
    var frase = 'const licenciado = true;', i = 0, cl = $('codeline');
    (function type() { cl.textContent = frase.slice(0, i++); if (i <= frase.length) setTimeout(type, 70); })();
  } else if (C.toquesTI) { $('codeline').textContent = 'const licenciado = true;'; }

  /* ---------- fundo animado ---------- */
  var cv = $('bg'), cx = cv.getContext('2d'), pts = [], W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);
  function size() {
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    var n = Math.min(70, Math.floor(innerWidth * innerHeight / 17000));
    pts = [];
    for (var j = 0; j < n; j++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25 * dpr, vy: (Math.random() - .5) * .25 * dpr, r: (Math.random() * 1.4 + .6) * dpr });
  }
  function frame() {
    cx.clearRect(0, 0, W, H);
    var ti = document.body.classList.contains('com-ti'), reach = 120 * dpr;
    for (var a = 0; a < pts.length; a++) {
      var p = pts[a];
      if (!reduce) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
      cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fillStyle = 'rgba(201,209,220,.55)'; cx.fill();
      if (ti) for (var b = a + 1; b < pts.length; b++) {
        var dx = p.x - pts[b].x, dy = p.y - pts[b].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < reach) { cx.strokeStyle = 'rgba(106,165,255,' + (.2 * (1 - d / reach)) + ')'; cx.lineWidth = dpr * .8; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(pts[b].x, pts[b].y); cx.stroke(); }
      }
    }
    if (!reduce && !document.hidden) requestAnimationFrame(frame);
  }
  size(); frame();
  window.addEventListener('resize', function () { size(); if (reduce) frame(); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden && !reduce) requestAnimationFrame(frame); });

  /* ---------- confetti ---------- */
  var cf = $('confetti'), cc = cf.getContext('2d'), bits = [], running = false;
  function cfSize() { cf.width = innerWidth * dpr; cf.height = innerHeight * dpr; }
  cfSize(); window.addEventListener('resize', cfSize);
  function burst(x, y) {
    if (reduce) return;
    var cols = ['#eef2f7', '#c9d1dc', '#6aa5ff', '#2f6bff', '#ffffff'];
    for (var j = 0; j < 90; j++) {
      var a = Math.random() * 6.283, s = (Math.random() * 7 + 3) * dpr;
      bits.push({ x: x * dpr, y: y * dpr, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 5 * dpr, w: (Math.random() * 6 + 4) * dpr, h: (Math.random() * 4 + 3) * dpr, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[j % cols.length], life: 1 });
    }
    if (!running) { running = true; requestAnimationFrame(loop); }
  }
  function loop() {
    cc.clearRect(0, 0, cf.width, cf.height);
    bits = bits.filter(function (b) { return b.life > 0 && b.y < cf.height + 40; });
    bits.forEach(function (b) {
      b.vy += .22 * dpr; b.x += b.vx; b.y += b.vy; b.vx *= .99; b.r += b.vr; b.life -= .008;
      cc.save(); cc.translate(b.x, b.y); cc.rotate(b.r); cc.globalAlpha = Math.max(0, b.life); cc.fillStyle = b.c; cc.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); cc.restore();
    });
    if (bits.length) requestAnimationFrame(loop); else running = false;
  }
  $('btnSim').addEventListener('click', function (e) { burst(e.clientX, e.clientY); });

  /* ---------- música ---------- */
  var audio = $('audio'), mb = $('musicBtn');
  audio.src = C.musica; audio.volume = 0;
  var audioOk = true, musicaIniciada = false;
  audio.addEventListener('error', function () { audioOk = false; mb.hidden = true; });
  function tocar() {
    var p = audio.play();
    if (!p) return;
    p.then(function () {
      mb.classList.add('on');
      var v = 0, iv = setInterval(function () { v = Math.min(C.volumeMusica, v + .02); audio.volume = v; if (v >= C.volumeMusica) clearInterval(iv); }, 120);
    }).catch(function () {});
  }
  var retomar = false;   // true se a música parou só porque o convite saiu do ecrã
  mb.addEventListener('click', function () {
    retomar = false;
    if (audio.paused) { audio.volume = C.volumeMusica; audio.play(); mb.classList.add('on'); }
    else { audio.pause(); mb.classList.remove('on'); }
  });
  /* pára ao minimizar, mudar de aplicação ou de separador; retoma ao voltar */
  function pausarFora() {
    if (!audio.paused) { retomar = true; audio.pause(); mb.classList.remove('on'); }
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pausarFora();
    else if (retomar) {
      retomar = false;
      audio.volume = C.volumeMusica;
      var p = audio.play();
      if (p && p.then) p.then(function () { mb.classList.add('on'); }).catch(function () {});
    }
  });
  window.addEventListener('pagehide', pausarFora);
  window.addEventListener('blur', function () { if (document.hidden) pausarFora(); });

  /* ---------- transição: capa -> portas -> convite ---------- */
  var portas = $('portas'), emTransicao = false;
  function saltarParaConvite(suave) {
    var y = $('convidado').getBoundingClientRect().top + window.scrollY;
    var raiz = document.documentElement, antes = raiz.style.scrollBehavior;
    raiz.style.scrollBehavior = suave ? 'smooth' : 'auto';
    window.scrollTo(0, y);
    raiz.style.scrollBehavior = antes;
  }
  $('abrir').addEventListener('click', function () {
    if (emTransicao) return;
    emTransicao = true;
    if (audioOk) {                                     // o toque conta como gesto: a música pode começar
      mb.hidden = false;
      if (!musicaIniciada) { musicaIniciada = true; tocar(); }
    }
    if (reduce) { saltarParaConvite(false); emTransicao = false; return; }
    document.body.classList.add('transicao');           // segura as animações do convite até as portas abrirem
    portas.className = 'portas on fechando';            // 1) as portas fecham sobre a capa
    setTimeout(function () {
      saltarParaConvite(false);                         // 2) com as portas fechadas, a página salta para o convite
      portas.className = 'portas on abrindo';           //    e as portas abrem com a luz
    }, 900);
    setTimeout(function () {                            // 3) a luz recua e o convite aparece
      document.body.classList.remove('transicao');
      io.disconnect(); observarTudo();
      burst(innerWidth / 2, innerHeight * .4);
    }, 900 + 1600);
    setTimeout(function () {                            // 4) fim: portas guardadas
      portas.className = 'portas';
      emTransicao = false;
    }, 900 + 2900);
  });
})();
