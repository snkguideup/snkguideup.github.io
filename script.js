// SNK IT Institute - JavaScript

document.addEventListener('DOMContentLoaded', function () {

  /* ============ থিম (Dark/Light) টগল ============ */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('snk-theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('snk-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('snk-theme', 'dark');
      }
    });
  }

  /* ============ ভাষা (Bangla/English) টগল ============ */
  const langToggle = document.getElementById('langToggle');
  const searchInput = document.getElementById('searchInput');

  function applyLanguage(lang) {
    document.querySelectorAll('[data-bn][data-en]').forEach(function (el) {
      el.innerHTML = el.getAttribute(lang === 'en' ? 'data-en' : 'data-bn');
    });
    if (searchInput) {
      searchInput.placeholder = searchInput.getAttribute(lang === 'en' ? 'data-en' : 'data-bn');
    }
    if (langToggle) {
      langToggle.textContent = lang === 'en' ? 'বাং' : 'EN';
    }
    document.documentElement.lang = lang;
    localStorage.setItem('snk-lang', lang);
  }

  const savedLang = localStorage.getItem('snk-lang') || 'bn';
  applyLanguage(savedLang);

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      const current = localStorage.getItem('snk-lang') || 'bn';
      applyLanguage(current === 'bn' ? 'en' : 'bn');
    });
  }

  /* ============ উষা AI চ্যাটবট ============ */
  const ushaWidget = document.querySelector('.usha-widget');
  const ushaFab = document.getElementById('ushaFab');
  const ushaClose = document.getElementById('ushaClose');
  const ushaForm = document.getElementById('ushaForm');
  const ushaInput = document.getElementById('ushaInput');
  const ushaMessages = document.getElementById('ushaMessages');

  if (ushaFab) {
    ushaFab.addEventListener('click', function () {
      ushaWidget.classList.toggle('open');
    });
  }
  if (ushaClose) {
    ushaClose.addEventListener('click', function () {
      ushaWidget.classList.remove('open');
    });
  }

  function addUshaMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = 'usha-msg ' + sender;
    msg.textContent = text;
    ushaMessages.appendChild(msg);
    ushaMessages.scrollTop = ushaMessages.scrollHeight;
  }

  // এখনকার জন্য সাধারণ প্লেসহোল্ডার রিপ্লাই — পরে চাইলে আসল AI (যেমন API) যুক্ত করা যাবে
  function getUshaReply(question) {
    const q = question.toLowerCase();
    if (q.includes('কোর্স') || q.includes('course')) {
      return 'আমাদের Free ও Paid দুই ধরনের কোর্স আছে — মেনু থেকে "Free Course" বা "Paid Course" এ ক্লিক করে দেখুন।';
    }
    if (q.includes('ভর্তি') || q.includes('admission')) {
      return 'ভর্তি সংক্রান্ত তথ্যের জন্য উপরের মেনু থেকে "Admission" পেজে যান।';
    }
    return 'ধন্যবাদ আপনার প্রশ্নের জন্য! খুব শীঘ্রই আমাদের টিম আপনাকে বিস্তারিত জানাবে। 😊';
  }

  if (ushaForm) {
    ushaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = ushaInput.value.trim();
      if (!text) return;
      addUshaMessage(text, 'user');
      ushaInput.value = '';
      setTimeout(function () {
        addUshaMessage(getUshaReply(text), 'bot');
      }, 500);
    });
  }

  /* ============ কোর্স ক্যাটাগরি ট্যাব ============ */
  const courseTabs = document.querySelectorAll('.course-tab');
  courseTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      courseTabs.forEach(function (t) {
        t.classList.remove('active');
        t.querySelector('.tab-dot').textContent = '○';
      });
      tab.classList.add('active');
      tab.querySelector('.tab-dot').textContent = '●';
    });
  });

  const tabsContainer = document.getElementById('courseTabs');
  const tabPrev = document.getElementById('tabPrev');
  const tabNext = document.getElementById('tabNext');
  if (tabPrev && tabsContainer) {
    tabPrev.addEventListener('click', function () {
      tabsContainer.scrollBy({ left: -200, behavior: 'smooth' });
    });
  }
  if (tabNext && tabsContainer) {
    tabNext.addEventListener('click', function () {
      tabsContainer.scrollBy({ left: 200, behavior: 'smooth' });
    });
  }

  /* ============ Recorded Course ট্যাব ============ */
  const recTabs = document.querySelectorAll('.recorded-tab');
  recTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      recTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
    });
  });

  const recTabsContainer = document.getElementById('recTabs');
  const recTabPrev = document.getElementById('recTabPrev');
  const recTabNext = document.getElementById('recTabNext');
  if (recTabPrev && recTabsContainer) {
    recTabPrev.addEventListener('click', function () {
      recTabsContainer.scrollBy({ left: -200, behavior: 'smooth' });
    });
  }
  if (recTabNext && recTabsContainer) {
    recTabNext.addEventListener('click', function () {
      recTabsContainer.scrollBy({ left: 200, behavior: 'smooth' });
    });
  }

});
