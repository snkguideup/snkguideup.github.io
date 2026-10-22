// SNK Ai Academy - usha-extra.js (Step 31)
// অ্যাডমিনের লেখা প্রশ্ন-উত্তর (Firestore: site/usha) দিয়ে উষা চ্যাটবটকে উত্তর দেওয়ায়।
// মিল না পেলে উষা আগের মতোই নিজের উত্তর দেয়। আগের কোড বদলাতে হয় না।
import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let items = [];
try {
  const s = await getDoc(doc(db, "site", "usha"));
  if (s.exists() && Array.isArray(s.data().items)) {
    items = s.data().items
      .map(i => ({ keys: String(i.keys || "").toLowerCase().split(/[,،;]+/).map(k => k.trim()).filter(Boolean), answer: String(i.answer || "") }))
      .filter(i => i.keys.length && i.answer);
  }
} catch (e) { /* পড়া না গেলে উষা আগের মতো চলবে */ }

const form = document.getElementById("ushaForm");
const input = document.getElementById("ushaInput");
const box = document.getElementById("ushaMessages");

function best(text) {
  const t = text.toLowerCase();
  let top = null, score = 0;
  items.forEach(i => i.keys.forEach(k => {
    if (t.indexOf(k) > -1 && k.length > score) { score = k.length; top = i; }
  }));
  return top;
}
function add(text, who) {
  const m = document.createElement("div");
  m.className = "usha-msg " + who;
  m.textContent = text;
  box.appendChild(m);
  box.scrollTop = box.scrollHeight;
}

if (form && input && box && items.length) {
  // ক্যাপচার ধাপে ধরি, যাতে মিল পেলে আগের হ্যান্ডলার না চলে
  form.addEventListener("submit", e => {
    const text = input.value.trim();
    if (!text) return;
    const hit = best(text);
    if (!hit) return;                       // মিল নেই → আগের উষা উত্তর দেবে
    e.preventDefault();
    e.stopImmediatePropagation();
    add(text, "user");
    input.value = "";
    setTimeout(() => add(hit.answer, "bot"), 500);
  }, true);
}
