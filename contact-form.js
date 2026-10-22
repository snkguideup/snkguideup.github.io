// SNK Ai Academy - contact-form.js (Step 33)
// যোগাযোগ পেজের ফর্মের বার্তা Firestore (messages) এ সংরক্ষণ করে। অ্যাডমিন /admin/messages/ এ দেখে।
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = [...document.querySelectorAll("form")].find(f => f.id !== "ushaForm" && f.querySelector("textarea"));
if (form) {
  const msgBox = document.createElement("div");
  msgBox.style.cssText = "margin-top:14px;padding:12px 16px;border-radius:10px;font-size:14px;font-weight:600;display:none;font-family:inherit";
  form.appendChild(msgBox);
  const say = (t, ok) => {
    msgBox.style.display = "block";
    msgBox.style.background = ok ? "#dcfce7" : "#fee2e2";
    msgBox.style.color = ok ? "#166534" : "#b91c1c";
    msgBox.textContent = t;
  };

  form.addEventListener("submit", async e => {
    e.preventDefault();
    e.stopImmediatePropagation();

    // ৩০ সেকেন্ডে একবারের বেশি পাঠানো যাবে না (স্প্যাম ঠেকাতে)
    try {
      const last = +localStorage.getItem("snk-contact-last") || 0;
      if (Date.now() - last < 30000) return say("একটু অপেক্ষা করে আবার পাঠান।", false);
    } catch (err) {}

    const fields = [...form.querySelectorAll("input, textarea, select")].filter(el => !["submit", "button", "checkbox", "radio", "hidden"].includes(el.type));
    const text = [];
    let email = "", phone = "", message = "";
    fields.forEach(el => {
      const v = el.value.trim();
      const hint = ((el.name || "") + (el.id || "") + (el.placeholder || "")).toLowerCase();
      if (el.tagName === "TEXTAREA") message = v;
      else if (el.type === "email" || /email|ইমেইল/.test(hint)) email = v;
      else if (el.type === "tel" || /phone|mobile|ফোন|মোবাইল/.test(hint)) phone = v;
      else text.push(v);
    });
    const name = text[0] || "", subject = text[1] || "";

    if (!message || message.length < 5) return say("বার্তাটি একটু বিস্তারিত লিখুন।", false);
    if (!email && !phone) return say("ইমেইল বা মোবাইল নম্বর দিন, যাতে আমরা উত্তর দিতে পারি।", false);

    const btn = form.querySelector("[type=submit], button:not([type=button])");
    if (btn) btn.disabled = true;
    try {
      await addDoc(collection(db, "messages"), {
        name: name.slice(0, 80), phone: phone.slice(0, 30), email: email.slice(0, 120),
        subject: subject.slice(0, 120), message: message.slice(0, 1500),
        status: "new", createdAt: serverTimestamp()
      });
      try { localStorage.setItem("snk-contact-last", String(Date.now())); } catch (err) {}
      form.reset();
      say("✅ আপনার বার্তা পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।", true);
    } catch (err) {
      say("পাঠানো যায়নি। একটু পরে আবার চেষ্টা করুন।", false);
    } finally { if (btn) btn.disabled = false; }
  }, true);
}
