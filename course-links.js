// course-links.js — কোর্স কার্ডের বাটনকে ডিটেইলস পেজের সাথে যুক্ত করে।
// যেকোনো পেজে (root বা ফোল্ডারে) একই ফাইল কাজ করবে।
import { db } from "./firebase-config.js";
import { collection, getDocs }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const BASE = new URL("./course/", import.meta.url).href;
const norm = s => String(s || "").replace(/\.\.\.|…/g, "").replace(/\s+/g, " ").trim().toLowerCase();
const titleOf = c => c.title || c.name || c.courseName || "";

let cache = null; // একবারই Firestore থেকে আনব
async function load() {
  if (!cache) cache = getDocs(collection(db, "courses")).then(snap => {
    const arr = []; snap.forEach(d => arr.push({ id: d.id, t: norm(titleOf(d.data())) })); return arr;
  });
  return cache;
}

async function link() {
  let courses = [];
  try { courses = await load(); } catch (e) { console.warn("course-links:", e); return; }

  document.querySelectorAll(".course-card").forEach(card => {
    if (card.dataset.linked) return;
    const h = card.querySelector("h4");
    if (!h) return;
    const t = norm(h.textContent);
    const m = courses.find(c => c.t && (c.t === t || c.t.startsWith(t) || t.startsWith(c.t)));
    if (!m) return;
    card.dataset.linked = "1";
    const free = card.querySelector(".btn-season-free");
    const paid = card.querySelector(".btn-season-paid");
    const details = card.querySelector(".btn-details");
    if (free) free.href = `${BASE}?id=${m.id}&season=1`;
    if (paid) paid.href = `${BASE}?id=${m.id}&season=2`;
    if (details) details.href = `${BASE}?id=${m.id}`;
  });
}

// site-content.js কার্ড আঁকার পরে চালানোর জন্য একটু অপেক্ষা + নতুন কার্ড এলে আবার
link();
setTimeout(link, 1500);
setTimeout(link, 4000);
new MutationObserver(() => link()).observe(document.body, { childList: true, subtree: true });
