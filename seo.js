// SNK Ai Academy - seo.js (Step 18)
// প্রতিটি পেজে favicon, description, share-preview (Open Graph) ট্যাগ নিজে থেকে যোগ করে।
(function () {
  var BASE = 'https://snkguideup.github.io/';
  var LOGO = BASE + 'logo.svg';
  var head = document.head;

  var DESC = {
    '': 'SNK Ai Academy — বাংলাদেশের লাইভ ও রেকর্ডেড স্কিল ডেভেলপমেন্ট প্ল্যাটফর্ম। AI, ওয়েব ডেভেলপমেন্ট, UI/UX ও আরও অনেক কোর্স।',
    'admission': 'SNK Ai Academy-তে কোর্সে ভর্তি হোন। সহজ পেমেন্ট, লাইভ ক্লাস ও জব সাপোর্ট।',
    'free-course-academy': 'ফ্রি রেকর্ডেড ক্র্যাশ কোর্স — SNK Ai Academy।',
    'free-course-itskill': 'ফ্রি IT স্কিল কোর্স: HTML/CSS, Git, Python, JavaScript ও আরও অনেক কিছু।',
    'paid-course-academy': 'SNK Ai Academy-র পেইড লাইভ কোর্সসমূহ।',
    'paid-course-itskill': 'MERN, Python & Django, Cyber Security, Flutter সহ প্রফেশনাল IT কোর্স।',
    'resource': 'ফ্রি রিসোর্স লাইব্রেরি — CV টেমপ্লেট, ইন্টারভিউ গাইড, চিটশিট ও নোটস।',
    'blogs': 'SNK Ai Academy ব্লগ — ক্যারিয়ার, AI ও স্কিল ডেভেলপমেন্ট নিয়ে লেখা।',
    'contact': 'SNK Ai Academy-র সাথে যোগাযোগ করুন।',
    'about': 'SNK Ai Academy সম্পর্কে জানুন — আমাদের গল্প, মিশন ও ভিশন।'
  };

  var seg = location.pathname.replace(/^\/|\/$|index\.html$/g, '').split('/')[0].replace('.html', '');
  var desc = DESC[seg] || DESC[''];

  function has(sel) { return !!head.querySelector(sel); }
  function add(tag, attrs) {
    var el = document.createElement(tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    head.appendChild(el);
  }

  if (!has('link[rel~="icon"]')) add('link', { rel: 'icon', type: 'image/svg+xml', href: LOGO });
  if (!has('meta[name="theme-color"]')) add('meta', { name: 'theme-color', content: '#ffc72c' });
  if (!has('meta[name="description"]')) add('meta', { name: 'description', content: desc });
  if (!has('link[rel="canonical"]')) add('link', { rel: 'canonical', href: BASE + location.pathname.replace(/^\//, '') });

  if (!has('meta[property="og:title"]')) add('meta', { property: 'og:title', content: document.title });
  if (!has('meta[property="og:description"]')) add('meta', { property: 'og:description', content: desc });
  if (!has('meta[property="og:image"]')) add('meta', { property: 'og:image', content: LOGO });
  if (!has('meta[property="og:type"]')) add('meta', { property: 'og:type', content: 'website' });
  if (!has('meta[property="og:locale"]')) add('meta', { property: 'og:locale', content: 'bn_BD' });
  if (!has('meta[property="og:site_name"]')) add('meta', { property: 'og:site_name', content: 'SNK Ai Academy' });

  // অ্যাডমিন/মেন্টর/ইউজার প্যানেল সার্চ ইঞ্জিনে দেখাবে না
  if (/^\/(admin|mentor|user)\//.test(location.pathname) && !has('meta[name="robots"]')) {
    add('meta', { name: 'robots', content: 'noindex,nofollow' });
  }
})();
