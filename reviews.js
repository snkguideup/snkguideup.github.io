// SNK Ai Academy - reviews.js (Step 22)
// কোর্স ডিটেইলস পেজে (course/index.html?id=...) রিভিউ ও রেটিং সেকশন নিজে থেকে যোগ করে।
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, getDocs, doc, getDoc, setDoc, query, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const cid = new URLSearchParams(location.search).get("id");
if (cid) {
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const bn = n => Number(n).toLocaleString("bn-BD");
  const stars = n => "★".repeat(n) + "☆".repeat(5 - n);

  const css = document.createElement("style");
  css.textContent = `
  .rv-sec{max-width:1000px;margin:10px auto 50px;padding:0 20px;font-family:'Hind Siliguri',sans-serif}
  .rv-sec h2{font-size:24px;font-weight:800;margin-bottom:6px}
  .rv-avg{font-size:15px;color:#6b7280;margin-bottom:18px}.rv-avg b{color:#b45309;font-size:20px}
  .rv-card{border:1px solid #eef0f2;border-radius:14px;padding:16px 18px;margin-bottom:12px;background:#fff}
  .rv-card .st{color:#f59e0b;font-size:16px;letter-spacing:2px}
  .rv-card p{font-size:14px;line-height:1.7;margin:6px 0;color:#374151}
  .rv-card small{color:#9ca3af;font-size:12px}
  .rv-form{border:1px dashed #ffc72c;border-radius:14px;padding:18px;margin-bottom:20px;background:#fffdf5}
  .rv-form h3{font-size:16px;margin-bottom:10px;color:#111827}
  .rv-pick{display:flex;gap:4px;margin-bottom:10px}
  .rv-pick button{background:none;border:none;font-size:30px;cursor:pointer;color:#d1d5db;padding:0}
  .rv-pick button.on{color:#f59e0b}
  .rv-form textarea{width:100%;min-height:80px;padding:10px 12px;border:1px solid #d1d5db;border-radius:10px;font-family:inherit;font-size:14px}
  .rv-form .go{margin-top:10px;padding:11px 22px;border:none;border-radius:999px;background:#ffc72c;font-weight:800;font-family:inherit;cursor:pointer;color:#111827}
  .rv-note{font-size:13px;color:#16a34a;font-weight:600;margin-top:8px}.rv-note.bad{color:#b91c1c}
  [data-theme="dark"] .rv-card{background:#0f172a;border-color:#1f2937}[data-theme="dark"] .rv-card p{color:#d1d5db}
  [data-theme="dark"] .rv-form{background:#0f172a}[data-theme="dark"] .rv-form h3{color:#f3f4f6}`;
  document.head.appendChild(css);

  const sec = document.createElement("section");
  sec.className = "rv-sec";
  sec.innerHTML = '<h2>⭐ স্টুডেন্টদের রিভিউ</h2><div class="rv-avg" id="rvAvg">লোড হচ্ছে…</div><div id="rvForm"></div><div id="rvList"></div>';
  const footer = document.querySelector("footer");
  if (footer) footer.parentNode.insertBefore(sec, footer); else document.body.appendChild(sec);

  async function loadList() {
    try {
      const snap = await getDocs(query(collection(db, "reviews"), where("courseId", "==", cid), where("status", "==", "approved")));
      const items = snap.docs.map(d => d.data()).sort((a, b) => ((b.createdAt && b.createdAt.seconds) || 0) - ((a.createdAt && a.createdAt.seconds) || 0));
      if (!items.length) { document.getElementById("rvAvg").textContent = "এখনো কোনো রিভিউ নেই।"; document.getElementById("rvList").innerHTML = ""; return; }
      const avg = items.reduce((s, r) => s + r.rating, 0) / items.length;
      document.getElementById("rvAvg").innerHTML = '<b>' + bn(avg.toFixed(1)) + '</b> / ৫ &nbsp; (' + bn(items.length) + 'টি রিভিউ)';
      document.getElementById("rvList").innerHTML = items.map(r =>
        '<div class="rv-card"><div class="st">' + stars(r.rating) + '</div><p>' + esc(r.text) + '</p><small>— ' + esc(r.name || "স্টুডেন্ট") + '</small></div>').join("");
    } catch (e) { document.getElementById("rvAvg").textContent = "রিভিউ লোড করা যায়নি।"; }
  }
  loadList();

  onAuthStateChanged(auth, async user => {
    const box = document.getElementById("rvForm");
    if (!user) return;
    const key = user.uid + "_" + cid;
    try {
      const enrolled = (await getDoc(doc(db, "enrollments", key))).exists();
      if (!enrolled) return;
      const mine = await getDoc(doc(db, "reviews", key));
      if (mine.exists()) {
        box.innerHTML = '<div class="rv-note">✅ আপনার রিভিউ জমা হয়েছে' + (mine.data().status === "approved" ? "।" : " — অ্যাডমিন অনুমোদনের পর দেখা যাবে।") + '</div>';
        return;
      }
      let rating = 0;
      box.innerHTML = '<div class="rv-form"><h3>আপনার অভিজ্ঞতা জানান</h3><div class="rv-pick">' +
        [1, 2, 3, 4, 5].map(i => '<button type="button" data-v="' + i + '">★</button>').join("") +
        '</div><textarea id="rvText" maxlength="500" placeholder="কোর্সটি কেমন লাগলো? (সর্বোচ্চ ৫০০ অক্ষর)"></textarea><br><button class="go" id="rvGo">রিভিউ জমা দিন</button><div id="rvMsg"></div></div>';
      const btns = box.querySelectorAll(".rv-pick button");
      btns.forEach(b => b.addEventListener("click", () => { rating = +b.dataset.v; btns.forEach(x => x.classList.toggle("on", +x.dataset.v <= rating)); }));
      document.getElementById("rvGo").addEventListener("click", async () => {
        const text = document.getElementById("rvText").value.trim(), msg = document.getElementById("rvMsg");
        if (!rating || text.length < 5) { msg.className = "rv-note bad"; msg.textContent = "রেটিং দিন এবং কিছু লিখুন।"; return; }
        try {
          let name = user.displayName || "";
          try { const u = await getDoc(doc(db, "users", user.uid)); if (u.exists()) name = u.data().name || u.data().displayName || name; } catch (e) {}
          await setDoc(doc(db, "reviews", key), { uid: user.uid, courseId: cid, name: name || "স্টুডেন্ট", rating, text, status: "pending", createdAt: serverTimestamp() });
          box.innerHTML = '<div class="rv-note">✅ ধন্যবাদ! অ্যাডমিন অনুমোদনের পর রিভিউ দেখা যাবে।</div>';
        } catch (e) { msg.className = "rv-note bad"; msg.textContent = "জমা হয়নি: " + e.message; }
      });
    } catch (e) { /* ফর্ম দেখানো যায়নি — সমস্যা নেই */ }
  });
}
