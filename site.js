// Mobile nav toggle — runs on every page
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  const gradientClasses = ['g1','g2','g3','g4','g5','g6'];

  const devoGrid = document.getElementById('devotionalsGrid');
  if (devoGrid) {
    fetch('content/devotionals.json').then(r => r.json()).then(data => {
      const items = data.devotionals || [];
      devoGrid.innerHTML = items.map(d => `
        <div class="devo-card">
          <div class="devo-date">${d.date}</div>
          <h3>${d.title}</h3>
          <p>${d.body}</p>
        </div>`).join('');
    }).catch(() => {});
  }

  const sermonList = document.getElementById('sermonList');
  if (sermonList) {
    fetch('content/sermons.json').then(r => r.json()).then(data => {
      const items = data.sermons || [];
      sermonList.innerHTML = items.map(s => `
        <div class="sermon-row">
          <div class="sermon-play">▶</div>
          <div><h3>${s.title}</h3><p>${s.description}</p></div>
          <div class="sermon-right">
            <div class="sermon-tag">${s.tag}</div>
            ${s.telegram_link ? `<a href="${s.telegram_link}" class="telegram-btn" target="_blank" rel="noopener">✈ Listen on Telegram</a>` : ''}
          </div>
        </div>`).join('');
    }).catch(() => {});
  }

  const eventsList = document.getElementById('eventsList');
  if (eventsList) {
    fetch('content/events.json').then(r => r.json()).then(data => {
      const items = data.events || [];
      eventsList.innerHTML = items.map(e => `
        <div class="event-row">
          <div class="event-date"><span class="num">${e.day}</span><span class="mon">${e.month}</span></div>
          <div><h3>${e.title}</h3><p>${e.description}</p></div>
          <div class="event-time">${e.time}</div>
        </div>`).join('');
    }).catch(() => {});
  }

  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    fetch('content/gallery.json').then(r => r.json()).then(data => {
      const items = data.gallery || [];
      galleryGrid.innerHTML = items.map((g, i) => {
        const cls = gradientClasses[i % gradientClasses.length];
        const bg = g.image ? `style="background-image:url('${g.image}')"` : '';
        return `<div class="${g.image ? '' : cls}" ${bg}>${g.image ? '' : g.caption}</div>`;
      }).join('');
    }).catch(() => {});
  }

  const aboutBody = document.getElementById('aboutBody');
  if (aboutBody) {
    fetch('content/about.json').then(r => r.json()).then(data => {
      const a = data.about || {};
      if (a.body) aboutBody.textContent = a.body;
      const email = document.getElementById('aboutEmail');
      if (email && a.email) { email.textContent = a.email; email.href = 'mailto:' + a.email; }
      const addr = document.getElementById('aboutAddress');
      if (addr && a.address) addr.textContent = a.address;
      const map = { tSunday: a.sunday_worship, tSchool: a.sunday_school, tBible: a.bible_study, tPrayer: a.prayer_meeting };
      Object.entries(map).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el && val) el.textContent = val;
      });
    }).catch(() => {});
  }

  const bulletinTrack = document.getElementById('bulletinTrack');
  if (bulletinTrack) {
    const items = [
      'Verse of the day: <b>"I can do all things through Christ."</b> — Philippians 4:13',
      '<b>Sunday Service</b> · 9:00 AM this week',
      '<b>Bible Study</b> · Thursdays, 5:30 PM',
      'New devotional posted every morning',
      '<b>Prayer Meeting</b> · Tuesdays, 5:30 PM'
    ];
    const html = items.map(i => `<span class="bulletin-item">${i}</span>`).join('');
    bulletinTrack.innerHTML = html + html;
  }
});
