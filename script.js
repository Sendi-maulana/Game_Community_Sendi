/* ============================================================
   Nexus Guild - script utama
   Project UTS Pemrograman Web - Sendi Maulana (2403010088)
   ============================================================ */

const sendi_pages = [
  ['index.html', 'Beranda'],
  ['tentang.html', 'Tentang'],
  ['game.html', 'Game'],
  ['turnamen.html', 'Turnamen'],
  ['leaderboard.html', 'Leaderboard'],
  ['galeri.html', 'Galeri'],
  ['kontak.html', 'Kontak']
];

const sendi_q = (selector) => document.querySelector(selector);
const sendi_qa = (selector) => document.querySelectorAll(selector);

/* Nama file halaman aktif. Query string dan hash diabaikan. */
const sendi_cur =
  (location.pathname.split('/').pop() || 'index.html').split(/[?#]/)[0] ||
  'index.html';

/* ---------------- Header & footer bersama ---------------- */

const sendi_header = sendi_q('#sendi_header');

if (sendi_header) {
  const sendi_menuItems = sendi_pages
    .map(([file, label]) => {
      const active = file === sendi_cur;
      return `<li><a href="${file}"${active ? ' class="sendi_active" aria-current="page"' : ''}>${label}</a></li>`;
    })
    .join('');

  sendi_header.innerHTML = `
    <a class="sendi_logo" href="index.html">NEXUS GUILD</a>
    <button class="sendi_burger" id="sendi_burger" type="button"
            aria-label="Buka menu" aria-expanded="false" aria-controls="sendi_menu">&#9776;</button>
    <nav aria-label="Navigasi utama">
      <ul class="sendi_menu" id="sendi_menu">${sendi_menuItems}</ul>
    </nav>`;
}

const sendi_footer = sendi_q('#sendi_footer');

if (sendi_footer) {
  sendi_footer.innerHTML =
    '&copy; 2026 Nexus Guild Gaming Community &mdash; Project UTS Pemrograman Web oleh Sendi Maulana (2403010088)';
}

/* ---------------- Menu mobile ---------------- */

const sendi_burger = sendi_q('#sendi_burger');
const sendi_menu = sendi_q('#sendi_menu');

if (sendi_burger && sendi_menu) {
  const setMenu = (open) => {
    sendi_menu.classList.toggle('sendi_open', open);
    sendi_burger.setAttribute('aria-expanded', String(open));
    sendi_burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  };

  sendi_burger.addEventListener('click', () => {
    setMenu(!sendi_menu.classList.contains('sendi_open'));
  });

  /* Tutup menu setelah memilih tautan. */
  sendi_menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  /* Tutup menu dengan tombol Escape. */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  /* Tutup menu saat klik di luar header. */
  document.addEventListener('click', (event) => {
    if (!event.target.closest('#sendi_header')) setMenu(false);
  });
}

/* ---------------- Animasi angka statistik ---------------- */

const sendi_reduceMotion = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

sendi_qa('[data-target]').forEach((el) => {
  const target = Number(el.dataset.target);
  if (!Number.isFinite(target)) return;

  const render = (value) => {
    el.textContent = value.toLocaleString('id-ID');
  };

  if (sendi_reduceMotion || target <= 0) {
    render(target);
    return;
  }

  const step = Math.max(1, Math.ceil(target / 60));
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(target, current + step);
    render(current);
    if (current >= target) clearInterval(timer);
  }, 25);
});

/* ---------------- Filter kartu game ---------------- */

const sendi_filterBtns = sendi_qa('.sendi_fbtn');
const sendi_gameCards = sendi_qa('[data-genre]');

if (sendi_filterBtns.length) {
  const setPressed = (btn, pressed) => {
    btn.classList.toggle('sendi_on', pressed);
    btn.setAttribute('aria-pressed', String(pressed));
  };

  sendi_filterBtns.forEach((btn) => setPressed(btn, btn.classList.contains('sendi_on')));

  sendi_filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sendi_filterBtns.forEach((other) => setPressed(other, other === btn));

      sendi_gameCards.forEach((card) => {
        card.hidden = !(btn.dataset.f === 'all' || card.dataset.genre === btn.dataset.f);
      });
    });
  });
}

/* ---------------- Hitung mundur turnamen ---------------- */

const sendi_countdown = sendi_q('#sendi_countdown');

if (sendi_countdown) {
  const sendi_eventDate = new Date('2026-12-20T19:00:00');
  const sendi_units = [
    ['Hari', 86400],
    ['Jam', 3600],
    ['Menit', 60],
    ['Detik', 1]
  ];

  let sendi_countdownTimer = null;

  const sendi_tick = () => {
    let sisa = Math.max(0, sendi_eventDate - new Date()) / 1000;

    if (sisa <= 0) {
      sendi_countdown.innerHTML = '<span>Turnamen sedang berlangsung!</span>';
      if (sendi_countdownTimer) clearInterval(sendi_countdownTimer);
      return;
    }

    sendi_countdown.innerHTML = sendi_units
      .map(([label, detik]) => {
        const nilai = Math.floor(sisa / detik);
        sisa -= nilai * detik;
        return `<span>${String(nilai).padStart(2, '0')} ${label}</span>`;
      })
      .join(' ');
  };

  sendi_tick();
  sendi_countdownTimer = setInterval(sendi_tick, 1000);
}

/* ---------------- Pencarian leaderboard ---------------- */

const sendi_search = sendi_q('#sendi_search');

if (sendi_search) {
  const sendi_table = sendi_q('#sendi_table');
  const sendi_rows = sendi_qa('#sendi_table tbody tr');
  let sendi_emptyRow = null;

  if (sendi_table) {
    const kolom = sendi_qa('#sendi_table thead th').length || 1;
    sendi_emptyRow = document.createElement('tr');
    sendi_emptyRow.className = 'sendi_empty';
    sendi_emptyRow.hidden = true;
    sendi_emptyRow.innerHTML = `<td colspan="${kolom}">Tidak ada pemain yang cocok dengan pencarian.</td>`;
    sendi_table.tBodies[0].append(sendi_emptyRow);
  }

  sendi_search.addEventListener('input', () => {
    const kata = sendi_search.value.trim().toLowerCase();
    let ketemu = 0;

    sendi_rows.forEach((row) => {
      const cocok = row.textContent.toLowerCase().includes(kata);
      row.hidden = !cocok;
      if (cocok) ketemu += 1;
    });

    if (sendi_emptyRow) sendi_emptyRow.hidden = ketemu > 0;
  });
}

/* ---------------- Lightbox galeri ---------------- */

const sendi_lightbox = sendi_q('#sendi_lightbox');

if (sendi_lightbox) {
  const sendi_tiles = sendi_qa('.sendi_tile');
  let sendi_lastFocus = null;

  const sendi_closeLightbox = () => {
    sendi_lightbox.classList.remove('sendi_show');
    sendi_lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sendi_locked');
    if (sendi_lastFocus) sendi_lastFocus.focus();
  };

  sendi_tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      sendi_lastFocus = tile;
      sendi_lightbox.innerHTML =
        tile.innerHTML +
        '<small class="sendi_hint">Klik di mana saja atau tekan Esc untuk menutup</small>';
      sendi_lightbox.classList.add('sendi_show');
      sendi_lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('sendi_locked');
      sendi_lightbox.focus();
    });
  });

  sendi_lightbox.addEventListener('click', sendi_closeLightbox);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sendi_lightbox.classList.contains('sendi_show')) {
      sendi_closeLightbox();
    }
  });
}

/* ---------------- Validasi form kontak ---------------- */

const sendi_form = sendi_q('#sendi_form');

if (sendi_form) {
  const sendi_fields = sendi_form.elements;
  const sendi_ok = sendi_q('#sendi_ok');

  const sendi_rules = {
    nama: 'Nama wajib diisi.',
    email: 'Isi email yang valid, contoh: kamu@mail.com.',
    pesan: 'Tulis pesan minimal 10 karakter.'
  };

  const sendi_clearErrors = () => {
    Object.keys(sendi_rules).forEach((key) => {
      const pesan = sendi_q('#sendi_err_' + key);
      if (pesan) pesan.textContent = '';
      const field = sendi_fields.namedItem(key);
      if (field) field.setAttribute('aria-invalid', 'false');
    });
  };

  sendi_form.addEventListener('submit', (event) => {
    event.preventDefault();

    let valid = true;
    let firstInvalid = null;

    Object.keys(sendi_rules).forEach((key) => {
      const field = sendi_fields.namedItem(key);
      if (!field) return;

      const nilai = field.value.trim();
      const invalid =
        !nilai ||
        (key === 'email' && !/^\S+@\S+\.\S+$/.test(nilai)) ||
        (key === 'pesan' && nilai.length < 10);

      const pesan = sendi_q('#sendi_err_' + key);
      if (pesan) pesan.textContent = invalid ? sendi_rules[key] : '';
      field.setAttribute('aria-invalid', String(invalid));

      if (invalid) {
        valid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (!valid) {
      if (sendi_ok) sendi_ok.hidden = true;
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const email = sendi_fields.namedItem('email');

    if (sendi_ok) {
      sendi_ok.hidden = false;
      sendi_ok.textContent =
        'Pesan terkirim! Admin Nexus Guild akan membalas ke ' +
        email.value.trim() +
        '.';
    }

    sendi_form.reset();
    sendi_clearErrors();
  });

  /* Sembunyikan pesan sukses begitu pengguna mulai mengetik lagi. */
  sendi_form.addEventListener('input', () => {
    if (sendi_ok) sendi_ok.hidden = true;
  });
}
