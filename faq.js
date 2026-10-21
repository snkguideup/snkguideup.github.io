// SNK Ai Academy - faq.js (Step 23)
// হোমপেজে "সাধারণ প্রশ্ন (FAQ)" সেকশন যোগ করে। প্রশ্ন-উত্তর বদলাতে নিচের FAQS তালিকা এডিট করুন।
(function () {
  var FAQS = [
    { q: 'কোর্সে কীভাবে ভর্তি হবো?', a: 'পছন্দের কোর্সে গিয়ে "ব্যাচে ভর্তি হোন" চাপুন, পেমেন্ট করুন এবং Transaction ID জমা দিন। অ্যাডমিন যাচাই করলেই আপনার কোর্স চালু হয়ে যাবে।' },
    { q: 'সিজন-১ ও সিজন-২ কী?', a: 'একটি কোর্সই দুই ভাগে ভাগ করা। সিজন-১ সবার জন্য ফ্রি, আর সিজন-২ (বাকি অংশ) পেমেন্টের পর খুলে যায়।' },
    { q: 'কী কী পেমেন্ট মাধ্যম আছে?', a: 'bKash, নগদ, রকেট ও কার্ড — অ্যাডমিশন পেজে মাধ্যম বেছে নিতে পারবেন।' },
    { q: 'ক্লাস মিস করলে কী হবে?', a: 'লাইভ ক্লাসের রেকর্ডিং পাবেন, ফলে যেকোনো সময় দেখে নিতে পারবেন।' },
    { q: 'কোর্স শেষে কি সার্টিফিকেট পাবো?', a: 'হ্যাঁ, কোর্স সম্পন্ন করলে সার্টিফিকেট দেওয়া হয়, যা আপনার ড্যাশবোর্ড থেকে প্রিন্ট বা PDF করতে পারবেন।' },
    { q: 'টেক ব্যাকগ্রাউন্ড না থাকলেও কি শেখা যাবে?', a: 'অবশ্যই। কোর্সগুলো একদম শুরু থেকে ধাপে ধাপে শেখানো হয়। প্রশ্ন থাকলে "উষা" চ্যাটবটে বা যোগাযোগ পেজে জানাতে পারেন।' }
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var css = document.createElement('style');
  css.textContent =
    '.faq-sec{max-width:900px;margin:0 auto;padding:0 32px 70px;font-family:"Hind Siliguri",sans-serif}' +
    '.faq-sec h2{text-align:center;font-size:26px;font-weight:700;margin-bottom:8px}' +
    '.faq-sub{text-align:center;color:#6b7280;font-size:14px;margin-bottom:26px}' +
    '.faq-item{border:1px solid #eef0f2;border-radius:14px;margin-bottom:12px;background:#fff;overflow:hidden}' +
    '.faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 20px;background:none;border:none;font-family:inherit;font-size:16px;font-weight:700;text-align:left;cursor:pointer;color:#111827}' +
    '.faq-q span{font-size:22px;color:#d97706;transition:transform .2s;flex-shrink:0}' +
    '.faq-a{max-height:0;overflow:hidden;transition:max-height .25s ease;padding:0 20px;font-size:14px;line-height:1.8;color:#4b5563}' +
    '.faq-item.open .faq-a{max-height:300px;padding:0 20px 16px}' +
    '.faq-item.open .faq-q span{transform:rotate(45deg)}' +
    '[data-theme="dark"] .faq-item{background:#0f172a;border-color:#1f2937}' +
    '[data-theme="dark"] .faq-q{color:#f3f4f6}[data-theme="dark"] .faq-a{color:#cbd5e1}' +
    '@media(max-width:560px){.faq-sec{padding:0 16px 50px}.faq-sec h2{font-size:22px}}';
  document.head.appendChild(css);

  var sec = document.createElement('section');
  sec.className = 'faq-sec';
  sec.innerHTML = '<h2>❓ সাধারণ প্রশ্ন (FAQ)</h2><p class="faq-sub">আপনার মনে থাকা প্রশ্নগুলোর উত্তর এখানে</p>' +
    FAQS.map(function (f) {
      return '<div class="faq-item"><button type="button" class="faq-q">' + esc(f.q) + '<span>+</span></button><div class="faq-a">' + esc(f.a) + '</div></div>';
    }).join('');

  var footer = document.querySelector('footer');
  if (footer) footer.parentNode.insertBefore(sec, footer); else document.body.appendChild(sec);

  sec.addEventListener('click', function (e) {
    var b = e.target.closest('.faq-q');
    if (!b) return;
    b.parentNode.classList.toggle('open');
  });

  // গুগল সার্চের জন্য FAQ ডাটা
  var ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map(function (f) { return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }; })
  });
  document.head.appendChild(ld);
})();
