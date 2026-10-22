// SNK Ai Academy - announce.js (Step 29)
// সাইটের একদম ওপরে ঘোষণা বার দেখায় (Firestore: site/announcement)। অ্যাডমিন /admin/announce/ থেকে বদলায়।
import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

try {
  const snap = await getDoc(doc(db, "site", "announcement"));
  const d = snap.exists() ? snap.data() : null;
  if (d && d.active && d.text) {
    const key = "snk-ann-" + (d.updatedKey || d.text.length + "-" + d.text.slice(0, 12));
    let closed = false;
    try { closed = localStorage.getItem(key) === "1"; } catch (e) {}
    if (!closed) {
      const css = document.createElement("style");
      css.textContent =
        ".ann-bar{display:flex;align-items:center;justify-content:center;gap:12px;padding:9px 44px 9px 16px;background:#14213d;color:#fff;font-family:'Hind Siliguri',sans-serif;font-size:14px;font-weight:600;text-align:center;position:relative;z-index:200}" +
        ".ann-bar a{background:#ffc72c;color:#111827;padding:4px 14px;border-radius:999px;font-size:13px;font-weight:700;text-decoration:none;white-space:nowrap}" +
        ".ann-bar button{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;font-size:18px;cursor:pointer;opacity:.8}" +
        ".ann-bar button:hover{opacity:1}@media(max-width:560px){.ann-bar{flex-direction:column;gap:6px;font-size:13px}}";
      document.head.appendChild(css);

      const bar = document.createElement("div");
      bar.className = "ann-bar";
      const span = document.createElement("span");
      span.textContent = "📢 " + d.text;
      bar.appendChild(span);
      if (d.link && /^(https?:\/\/|\/|\.\.?\/|[a-z0-9-]+\/)/i.test(d.link)) {
        const a = document.createElement("a");
        a.href = d.link;
        a.textContent = d.linkText || "বিস্তারিত দেখুন";
        bar.appendChild(a);
      }
      const x = document.createElement("button");
      x.type = "button"; x.setAttribute("aria-label", "বন্ধ করুন"); x.textContent = "✕";
      x.onclick = () => { bar.remove(); try { localStorage.setItem(key, "1"); } catch (e) {} };
      bar.appendChild(x);
      document.body.insertBefore(bar, document.body.firstChild);
    }
  }
} catch (e) { /* ঘোষণা পড়া না গেলে কিছু দেখানো হবে না */ }
