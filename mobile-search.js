// SNK Ai Academy - mobile-search.js (Step 19)
// ফোন/ট্যাবলেটে 🔍 বাটন দেখায়। চাপলে সার্চ বার নেমে আসে (course-search.js এর সাথে কাজ করে)।
(function () {
  var box = document.querySelector('.search-box');
  var right = document.querySelector('.header-right');
  var input = document.getElementById('searchInput');
  if (!box || !right || !input) return;

  var css = document.createElement('style');
  css.textContent =
    '.m-search-btn{display:none;height:38px;width:38px;border-radius:999px;border:none;background:#f3f4f6;font-size:16px;cursor:pointer;align-items:center;justify-content:center}' +
    '[data-theme="dark"] .m-search-btn{background:#1f2937}' +
    '@media (max-width:1100px){' +
      '.m-search-btn{display:flex}' +
      '.search-box.m-open{display:flex!important;position:fixed;top:12px;left:12px;right:12px;width:auto;z-index:1200;background:#fff;border:1px solid #ffc72c;box-shadow:0 10px 30px rgba(0,0,0,.2);padding:12px 16px}' +
      '[data-theme="dark"] .search-box.m-open{background:#0f172a}' +
      '.m-search-close{display:none;background:none;border:none;font-size:18px;cursor:pointer;color:#6b7280;margin-left:auto}' +
      '.search-box.m-open .m-search-close{display:block}' +
    '}' +
    '@media (min-width:1101px){.m-search-close{display:none!important}}';
  document.head.appendChild(css);

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'm-search-btn';
  btn.setAttribute('aria-label', 'সার্চ');
  btn.textContent = '🔍';
  right.insertBefore(btn, right.firstChild);

  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'm-search-close';
  closeBtn.setAttribute('aria-label', 'বন্ধ করুন');
  closeBtn.textContent = '✕';
  box.appendChild(closeBtn);

  function open() { box.classList.add('m-open'); setTimeout(function () { input.focus(); }, 50); }
  function close() { box.classList.remove('m-open'); input.blur(); }

  btn.addEventListener('click', function (e) { e.stopPropagation(); open(); });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  document.addEventListener('click', function (e) {
    if (box.classList.contains('m-open') && !box.contains(e.target) && e.target !== btn) close();
  });
})();
