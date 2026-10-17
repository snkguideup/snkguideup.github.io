// SNK Ai Academy - উষা চ্যাটবটের প্রশ্ন-উত্তর (ফ্রি, নিয়ম-ভিত্তিক)
// নতুন প্রশ্ন যোগ করতে নিচের FAQ তালিকায় একটা { k: [...কিওয়ার্ড], a: "উত্তর" } বসান।
(function () {
  const FAQ = [
    { k: ["হ্যালো", "হাই", "হেলো", "আসসালামু", "সালাম", "hello", "hi", "hey"],
      a: "হ্যালো! 😊 আমি উষা। কোর্স, ভর্তি, পেমেন্ট বা ক্লাস নিয়ে যেকোনো প্রশ্ন করতে পারেন।" },
    { k: ["কোর্স", "course", "কি কি কোর্স", "কোন কোর্স", "ক্লাস কি"],
      a: "আমাদের Free ও Paid দুই ধরনের কোর্স আছে। হোমপেজে \"আপকামিং লাইভ কোর্স\" সেকশনে চলমান ব্যাচগুলো দেখুন, অথবা উপরের মেনুর Free Course / Paid Course থেকে বেছে নিন।" },
    { k: ["ফ্রি", "free", "বিনামূল্যে", "রেকর্ডেড", "recorded"],
      a: "হ্যাঁ, আমাদের ফ্রি রেকর্ডেড কোর্স আছে। হোমপেজে \"Free Recorded Course\" সেকশনে গিয়ে বিস্তারিত দেখুন ও এনরোল করুন।" },
    { k: ["ভর্তি", "admission", "এনরোল", "enroll", "রেজিস্ট্রেশন", "কিভাবে ভর্তি", "কীভাবে ভর্তি"],
      a: "ভর্তির জন্য পছন্দের কোর্সে \"বিস্তারিত দেখি\" চাপুন, তারপর \"ব্যাচে ভর্তি হোন\" বাটনে ক্লিক করে পেমেন্ট সম্পন্ন করুন। উপরের মেনুর Admission পেজেও যেতে পারেন।" },
    { k: ["পেমেন্ট", "payment", "টাকা", "বিকাশ", "bkash", "নগদ", "nagad", "রকেট", "ফি", "দাম", "মূল্য", "price", "কত টাকা"],
      a: "কোর্সের মূল্য ও ডিসকাউন্ট প্রতিটি কোর্সের Admission পেজে দেওয়া আছে। পেমেন্টের মাধ্যম ওই পেজের নিচের \"কমপ্লিট পেমেন্ট\" অংশে পাবেন।" },
    { k: ["সার্টিফিকেট", "certificate", "সনদ"],
      a: "কোর্স সফলভাবে শেষ করলে সার্টিফিকেট দেওয়া হয় (কোর্সের Admission পেজে \"এই কোর্সে আপনি পাচ্ছেন\" অংশে বিস্তারিত দেখুন)।" },
    { k: ["জব", "চাকরি", "job", "প্লেসমেন্ট", "placement", "সিভি", "cv", "ইন্টারভিউ", "interview"],
      a: "আমাদের লাইভ কোর্সে জব প্লেসমেন্ট টিম, সিভি রিভিউ ও ইন্টারভিউ প্র্যাকটিসের সাপোর্ট আছে। হোমপেজে \"কি কি পাচ্ছেন লাইভ কোর্স\" সেকশনে বিস্তারিত পাবেন।" },
    { k: ["সময়", "রুটিন", "সিডিউল", "schedule", "কখন", "ক্লাস কখন", "time"],
      a: "ক্লাসের দিন ও সময় প্রতিটি ব্যাচের Admission পেজে \"ব্যাচ ইনফো\" অংশে দেওয়া আছে।" },
    { k: ["সিট", "seat", "ব্যাচ", "batch", "শুরু", "কবে"],
      a: "কোন ব্যাচে কত সিট বাকি এবং কতদিন পর শুরু হবে, তা হোমপেজের কোর্স কার্ডেই দেখতে পাবেন।" },
    { k: ["ডেমো", "demo", "ট্রায়াল", "trial"],
      a: "কোর্স কেনার আগে ডেমো ক্লাস দেখে নেওয়া ভালো। প্রতিটি কোর্সের Admission পেজে ডেমো ভিডিও আছে।" },
    { k: ["রিফান্ড", "refund", "ফেরত"],
      a: "রিফান্ড সংক্রান্ত নিয়ম ফুটারের \"রিফান্ড পলিসি\" পেজে আছে। আরও জানতে সাপোর্ট টিমের সাথে যোগাযোগ করুন।" },
    { k: ["অ্যাপ", "app", "এন্ড্রয়েড", "android", "আইওএস", "ios", "ডাউনলোড", "install", "ইন্সটল"],
      a: "মোবাইলে সাইট খুলে \"📲 অ্যাপ ইন্সটল করুন\" বাটন চাপলে অ্যাপের মতো ব্যবহার করতে পারবেন। (বাটন না এলে ব্রাউজার মেনু থেকে Add to Home screen করুন)" },
    { k: ["ইন্সট্রাক্টর", "instructor", "মেন্টর", "mentor", "শিক্ষক", "পড়াতে চাই", "জয়েন"],
      a: "ইন্সট্রাক্টর হিসেবে যুক্ত হতে চাইলে ফুটারের \"ইন্সট্রাক্টর হিসেবে জয়েন করুন\" লিংকে যান অথবা সাপোর্টে যোগাযোগ করুন।" },
    { k: ["লগইন", "login", "সাইনআপ", "signup", "পাসওয়ার্ড", "password", "অ্যাকাউন্ট", "account"],
      a: "উপরের ডানে \"Login/Signin\" চাপুন। নতুন হলে \"সাইনআপ\" ট্যাবে অ্যাকাউন্ট খুলুন। পাসওয়ার্ড ভুলে গেলে লগইন ফর্মের \"পাসওয়ার্ড ভুলে গেছেন?\" চাপুন।" },
    { k: ["ধন্যবাদ", "থ্যাংক", "thanks", "thank"],
      a: "আপনাকেও ধন্যবাদ! 😊 আর কিছু জানার থাকলে বলুন।" }
  ];

  const QUICK = ["কোর্স কি কি আছে?", "কিভাবে ভর্তি হব?", "পেমেন্ট কিভাবে করব?", "যোগাযোগ"];

  function contactReply() {
    const ul = document.querySelector(".footer-contact");
    const lines = ul ? Array.from(ul.querySelectorAll("li")).map((li) => li.textContent.trim()).filter(Boolean) : [];
    return lines.length
      ? "আমাদের সাথে যোগাযোগ:\n" + lines.join("\n")
      : "যোগাযোগের তথ্য ফুটারে (পেজের একদম নিচে) পাবেন।";
  }

  function reply(q) {
    const text = q.toLowerCase().replace(/[?!.,।]/g, " ");
    if (/(যোগাযোগ|contact|ফোন|নম্বর|নাম্বার|ঠিকানা|ইমেইল|email|কল|সাপোর্ট|support|হোয়াটসঅ্যাপ|whatsapp)/i.test(text)) return contactReply();
    let best = null, bestScore = 0;
    FAQ.forEach((item) => {
      let score = 0;
      item.k.forEach((w) => { if (text.includes(w.toLowerCase())) score += w.length > 3 ? 2 : 1; });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    return best ? best.a : "দুঃখিত, প্রশ্নটা ঠিক বুঝতে পারিনি। 🙏 কোর্স, ভর্তি, পেমেন্ট বা যোগাযোগ নিয়ে জিজ্ঞেস করুন, অথবা সাপোর্ট টিমের সাথে সরাসরি কথা বলুন।";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("ushaForm");
    const input = document.getElementById("ushaInput");
    const box = document.getElementById("ushaMessages");
    if (!form || !input || !box) return;

    function add(text, who) {
      const m = document.createElement("div");
      m.className = "usha-msg " + who;
      m.style.whiteSpace = "pre-line";
      m.textContent = text;
      box.appendChild(m);
      box.scrollTop = box.scrollHeight;
    }

    function ask(q) {
      if (!q) return;
      add(q, "user");
      setTimeout(() => add(reply(q), "bot"), 450);
    }

    // পুরনো উত্তরদাতাকে থামিয়ে এটা বসানো
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const q = input.value.trim();
      input.value = "";
      ask(q);
    }, true);

    // দ্রুত প্রশ্নের বাটন
    const chips = document.createElement("div");
    chips.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;";
    QUICK.forEach((q) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = q;
      b.style.cssText = "border:1px solid #ffc72c;background:#fff;color:#111827;border-radius:999px;padding:6px 12px;font-family:inherit;font-size:12px;cursor:pointer;";
      b.onclick = () => { ask(q); chips.remove(); };
      chips.appendChild(b);
    });
    box.appendChild(chips);
  });
})();
