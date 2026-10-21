// SNK Ai Academy - speed.js (Step 24)
// সাইট দ্রুত করে: ছবি দরকারের সময় লোড (lazy), দরকারি সার্ভারে আগে থেকে সংযোগ, লিংকে হোভার করলে পেজ আগে থেকে লোড।
(function () {
  var head = document.head;

  // ১. দরকারি সার্ভারে আগেভাগে সংযোগ
  ['https://raw.githubusercontent.com', 'https://www.gstatic.com'].forEach(function (u) {
    if (head.querySelector('link[rel="preconnect"][href="' + u + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'preconnect'; l.href = u; l.crossOrigin = '';
    head.appendChild(l);
  });

  // ২. ছবি অপটিমাইজ
  function tune(img) {
    if (img.dataset.speed) return;
    img.dataset.speed = '1';
    if (img.classList.contains('banner-image')) {      // হিরো ছবি আগে লোড হোক
      img.setAttribute('fetchpriority', 'high');
      img.loading = 'eager';
      return;
    }
    if (img.closest('.header') || img.closest('.logo')) return; // লোগো সবসময় সাথে সাথে
    img.loading = 'lazy';
    img.decoding = 'async';
  }
  function tuneAll(root) { (root.querySelectorAll ? root.querySelectorAll('img') : []).forEach(tune); }
  tuneAll(document);

  // পরে জুড়ে যাওয়া ছবি (Firestore থেকে আসা কার্ড ইত্যাদি)
  new MutationObserver(function (list) {
    list.forEach(function (m) {
      m.addedNodes.forEach(function (n) {
        if (n.nodeType !== 1) return;
        if (n.tagName === 'IMG') tune(n); else tuneAll(n);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

  // ৩. লিংকে হোভার/টাচ করলে পেজ আগে থেকে লোড
  var done = {};
  function prefetch(e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank') return;
    var url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin || url.pathname === location.pathname || done[url.href]) return;
    if (/^\/(admin|mentor)\//.test(url.pathname)) return;
    done[url.href] = 1;
    var l = document.createElement('link');
    l.rel = 'prefetch'; l.href = url.href;
    head.appendChild(l);
  }
  document.addEventListener('mouseover', prefetch, { passive: true });
  document.addEventListener('touchstart', prefetch, { passive: true });
})();
