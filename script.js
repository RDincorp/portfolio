/**
 * Main Interactive Logic for Academic Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProfileData();
  renderStats();
  renderPortfolioItems('all');
  setupFilterListeners();
});

/* --- Theme Manager (Dark / Light) --- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('academic_theme') || 'dark';
  
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon(true);
  } else {
    document.documentElement.removeAttribute('data-theme');
    updateThemeIcon(false);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('academic_theme', 'dark');
      updateThemeIcon(false);
      showToast('Включена тёмная тема');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('academic_theme', 'light');
      updateThemeIcon(true);
      showToast('Включена светлая тема');
    }
  });
}

function updateThemeIcon(isLight) {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.textContent = isLight ? '🌙' : '☀️';
  }
}

/* --- Render Profile Info from data.js --- */
function renderProfileData() {
  if (typeof PROFILE_DATA === 'undefined') return;

  const data = PROFILE_DATA;
  
  // Header logo & title
  setTextContent('brandName', 'Портфолио научного сотрудника');
  setTextContent('heroName', data.fullName);
  setTextContent('heroTitle', data.academicTitle);
  setTextContent('heroAffiliation', data.affiliation);
  setTextContent('heroDegree', data.degree);
  setTextContent('heroLocation', data.location);
  setTextContent('aboutBio', data.aboutBio);

  // Avatar card name/role
  setTextContent('avatarName', data.shortName);
  setTextContent('avatarRole', 'Магистр политологии, м. н. с.');

  // Research focus list
  const focusListEl = document.getElementById('researchFocusList');
  if (focusListEl && data.researchFocus) {
    focusListEl.innerHTML = data.researchFocus
      .map(item => `
        <li class="focus-item">
          <span class="focus-icon">◆</span>
          <span>${item}</span>
        </li>
      `).join('');
  }

  // Analytical stack
  const stackContainer = document.getElementById('analyticalStack');
  if (stackContainer && data.analyticalStack) {
    stackContainer.innerHTML = data.analyticalStack
      .map(s => `
        <div class="stack-item">
          <span class="stack-item-title">${s.name}</span>
          ${s.tools ? `<span class="stack-item-tools">${s.tools}</span>` : ''}
        </div>
      `).join('');
  }

  // Academic links
  if (data.academicLinks) {
    setHref('linkOrcid', `https://orcid.org/${data.academicLinks.orcid}`);
    setHref('linkELibrary', data.academicLinks.eLibrary);
    setHref('linkResearchGate', data.academicLinks.researchGate);
    setHref('linkTelegram', data.academicLinks.telegram);
    setHref('linkEmail', data.academicLinks.email);
  }
}

/* --- Render Stats Bar --- */
function renderStats() {
  if (typeof PROFILE_DATA === 'undefined' || !PROFILE_DATA.stats) return;
  const s = PROFILE_DATA.stats;
  
  setTextContent('statConferences', s.conferencesCount);
  setTextContent('statMemos', s.memosCount);
  setTextContent('statResearch', s.researchProjectsCount);
  setTextContent('statExperience', s.yearsExperience);
}

/* --- Render Portfolio Cards Grid --- */
let currentCategory = 'all';
let currentSearchQuery = '';

function renderPortfolioItems(category = 'all', searchQuery = '') {
  const container = document.getElementById('portfolioGrid');
  if (!container || typeof PORTFOLIO_ITEMS === 'undefined') return;

  currentCategory = category;
  currentSearchQuery = searchQuery.toLowerCase().trim();

  let items = PORTFOLIO_ITEMS;

  // Filter by category
  if (category !== 'all') {
    items = items.filter(item => item.type === category);
  }

  // Filter by search query
  if (currentSearchQuery) {
    items = items.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(currentSearchQuery);
      const matchSummary = item.summary.toLowerCase().includes(currentSearchQuery);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(currentSearchQuery));
      return matchTitle || matchSummary || matchTags;
    });
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>По вашему запросу ничего не найдено.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => createCardHTML(item)).join('');
}

function createCardHTML(item) {
  const badgeClassMap = {
    conference: 'badge-conference',
    article: 'badge-article',
    achievement: 'badge-achievement',
    current_nir: 'badge-current-nir',
    completed_nir: 'badge-completed-nir',
    media: 'badge-media',
    field: 'badge-field'
  };

  const badgeClass = badgeClassMap[item.badgeType] || 'badge-conference';

  const tagsHTML = item.tags
    .map(tag => `<span class="tag-pill">#${tag}</span>`)
    .join('');

  return `
    <div class="portfolio-card" data-id="${item.id}">
      <div>
        <div class="card-top">
          <span class="card-badge ${badgeClass}">${item.badge}</span>
          <span class="card-year">${item.year}</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-summary">${item.summary}</p>
      </div>

      <div>
        <div class="card-bottom" style="justify-content: flex-end;">
          <button class="btn-detail" onclick="openDetailModal('${item.id}')">
            Подробнее &rarr;
          </button>
        </div>
      </div>
    </div>
  `;
}

/* --- Filter & Search Listeners --- */
function setupFilterListeners() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const category = e.target.getAttribute('data-filter');
      renderPortfolioItems(category, currentSearchQuery);
    });
  });
}

function setupSearchListener() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderPortfolioItems(currentCategory, e.target.value);
    });
  }
}

/* --- Render Analytical Memos Showcase Section --- */
function renderMemosShowcase() {
  const container = document.getElementById('memosContainer');
  if (!container || typeof PORTFOLIO_ITEMS === 'undefined') return;

  const memos = PORTFOLIO_ITEMS.filter(i => i.type === 'memo');

  container.innerHTML = memos.map(memo => `
    <div class="memo-featured-card">
      <div class="memo-header">
        <div>
          <span class="card-badge badge-internal" style="margin-bottom: 0.5rem; display: inline-block;">${memo.badge}</span>
          <h3 class="memo-title">${memo.title}</h3>
        </div>
        <span class="card-year">${memo.date}</span>
      </div>
      <p style="font-size: 0.95rem; color: var(--text-main); font-weight: 500;">${memo.summary}</p>

      <div class="memo-grid-3">
        <div>
          <div class="memo-block-title">Контекст / Постановка</div>
          <div class="memo-block-text">${memo.details.eventOrContext || memo.details.problem}</div>
        </div>
        <div>
          <div class="memo-block-title">Методология</div>
          <div class="memo-block-text">${memo.details.methodology}</div>
        </div>
        <div>
          <div class="memo-block-title">Практический эффект</div>
          <div class="memo-block-text">${memo.details.impact || 'Материалы переданы профильным структурным подразделениям.'}</div>
        </div>
      </div>
    </div>
  `).join('');
}

/* --- Render Conferences Timeline --- */
function renderTimeline() {
  const container = document.getElementById('timelineContainer');
  if (!container || typeof PORTFOLIO_ITEMS === 'undefined') return;

  const confs = PORTFOLIO_ITEMS.filter(i => i.type === 'conference');

  container.innerHTML = confs.map(conf => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">${conf.date}</div>
        <h3 class="timeline-title">${conf.title}</h3>
        <p class="timeline-event">${conf.details.eventOrContext}</p>
        <button class="btn-detail" onclick="openDetailModal('${conf.id}')">
          Тезисы и методология &rarr;
        </button>
      </div>
    </div>
  `).join('');
}

/* --- Modal Popup Detail Manager --- */
window.openDetailModal = function(id) {
  const item = PORTFOLIO_ITEMS.find(i => i.id === id);
  if (!item) return;

  const modal = document.getElementById('detailModal');
  const modalBody = document.getElementById('modalBody');

  const badgeClassMap = {
    conference: 'badge-conference',
    article: 'badge-article',
    achievement: 'badge-achievement',
    current_nir: 'badge-current-nir',
    completed_nir: 'badge-completed-nir',
    media: 'badge-media',
    field: 'badge-field'
  };

  const keyFindingsList = item.details.keyFindings
    ? `<ul class="modal-bullet-list">
        ${item.details.keyFindings.map(f => `<li>${f}</li>`).join('')}
       </ul>`
    : '';

  modalBody.innerHTML = `
    <span class="card-badge ${badgeClassMap[item.badgeType]} modal-badge">${item.badge}</span>
    <h2 class="modal-title">${item.title}</h2>
    
    ${item.details.eventOrContext ? `
      <div class="modal-section">
        <div class="modal-section-title">Мероприятие</div>
        <div class="modal-section-body">${item.details.eventOrContext}</div>
      </div>
    ` : ''}

    ${item.details.url ? `
      <div class="modal-section" style="margin-top: 1.5rem;">
        <a href="${item.details.url}" target="_blank" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
          Открыть материал &nearr;
        </a>
      </div>
    ` : ''}
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeDetailModal = function() {
  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

/* --- Copy Email / Text Helper --- */
window.copyToClipboard = function(text, label = 'Скопировано в буфер обмена!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(label);
  }).catch(err => {
    console.error('Copy failed', err);
  });
};

/* --- Toast Notification Helper --- */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* --- Real Contact Form Submission via FormSubmit --- */
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправка...';

      fetch('https://formsubmit.co/ajax/rd.inskiya@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "Новое сообщение с сайта-портфолио",
          Имя_и_организация: document.getElementById('senderName').value,
          Email_для_ответа: document.getElementById('senderEmail').value,
          Сообщение: document.getElementById('senderMessage').value
        })
      })
      .then(response => response.json())
      .then(data => {
        showToast('Сообщение отправлено! Оно доставлено на вашу почту.');
        form.reset();
      })
      .catch(error => {
        showToast('Ошибка отправки. Напишите напрямую на rd.inskiya@gmail.com');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
    });
  }
}

/* --- Helper Utilities --- */
function setTextContent(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHref(id, url) {
  const el = document.getElementById(id);
  if (el) el.href = url;
}
