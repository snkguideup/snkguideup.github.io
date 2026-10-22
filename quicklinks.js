// SNK Ai Academy - quicklinks.js (Step 27)
// স্টুডেন্ট / অ্যাডমিন / মেন্টর ড্যাশবোর্ডের ওপরে "দ্রুত লিংক" বার যোগ করে।
// ড্যাশবোর্ডের আসল ফাইলে হাত না দিয়ে শুধু ১ লাইন বসালেই কাজ করে।
(function () {
  var ROOT = (document.currentScript && document.currentScript.src || '').replace(/quicklinks\.js.*$/, '');
  if (!ROOT) return;
  var p = location.pathname;

  var SETS = {
    user: [['🎥 আমার ক্লাস ও সার্টিফিকেট', 'user/classes/'], ['👤 আমার প্রোফাইল', 'user/profile/'], ['📚 কোর্স দেখুন', 'paid-course-academy/'], ['🏠 হোম', '']],
    admin: [['📊 পরিসংখ্যান', 'admin/stats/'], ['💳 অর্ডার', 'admin/orders/'], ['🎥 লাইভ ও সার্টিফিকেট', 'admin/live/'],
            ['⭐ রিভিউ', 'admin/reviews/'], ['📢 ঘোষণা', 'admin/announce/'], ['📥 এক্সপোর্ট', 'admin/export/'], ['🤖 উষা', 'admin/usha/'], ['🔓 অ্যাক্সেস', 'admin/access/'], ['👥 ইউজার', 'admin/users/'], ['✏️ কনটেন্ট', 'admin/content/']],
    mentor: [['📝 ব্লগ পোস্ট', 'mentor/posts/'], ['🏠 হোম', '']]
  };
  var key = /\/admin\//.test(p) ? 'admin' : /\/mentor\//.test(p) ? 'mentor' : /\/user\//.test(p) ? 'user' : null;
  if (!key) return;

  var css = document.createElement('style');
  css.textContent =
    '.ql-bar{display:flex;flex-wrap:wrap;gap:8px;max-width:1200px;margin:0 auto;padding:14px 20px;font-family:"Hind Siliguri",sans-serif}' +
    '.ql-bar a{padding:9px 16px;border-radius:999px;background:#fff4cc;color:#111827;font-size:13px;font-weight:700;text-decoration:none;border:1px solid #ffe08a;transition:transform .15s,background .15s}' +
    '.ql-bar a:hover{background:#ffc72c;transform:translateY(-2px)}' +
    '.ql-bar a.here{background:#14213d;color:#fff;border-color:#14213d}' +
    '[data-theme="dark"] .ql-bar a{background:#1f2937;color:#e5e7eb;border-color:#374151}' +
    '[data-theme="dark"] .ql-bar a:hover{background:#ffc72c;color:#111827}';
  document.head.appendChild(css);

  var bar = document.createElement('nav');
  bar.className = 'ql-bar';
  SETS[key].forEach(function (l) {
    var a = document.createElement('a');
    a.href = ROOT + l[1];
    a.textContent = l[0];
    var here = new URL(a.href).pathname;
    if (here === p || (here.length > 1 && p.indexOf(here) === 0 && here !== '/')) a.className = 'here';
    bar.appendChild(a);
  });

  function put() {
    var header = document.querySelector('header');
    if (header && header.parentNode) header.parentNode.insertBefore(bar, header.nextSibling);
    else document.body.insertBefore(bar, document.body.firstChild);
  }
  if (document.body) put(); else document.addEventListener('DOMContentLoaded', put);
})();
