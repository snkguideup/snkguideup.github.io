// SNK home-blog.js — হোমপেজে সর্বশেষ ৩টি ব্লগ পোস্ট (নিজে থেকেই ফুটারের আগে বসে যায়)
// index.html-এ </body>-এর ঠিক আগে এই এক লাইন যোগ করুন:
//   <script type="module" src="home-blog.js"></script>
import { db } from "./firebase-config.js";
// ⚠️ ভার্সন (10.12.2) আপনার firebase-config.js এর সাথে মিলিয়ে নিন
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const bn = n => String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const dOf = x => { const t = x.createdAt; return t && t.toDate ? t.toDate() : (t ? new Date(t) : null); };
const mins = t => Math.max(1, Math.round(String(t || "").split(/\s+/).length / 150));
const blogUrl = p => new URL("blogs/" + (p || ""), import.meta.url).href;

(async () => {
  let posts = [];
  try {
    const s = await getDocs(query(collection(db, "posts"), where("published", "==", true)));
    posts = s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (dOf(b) || 0) - (dOf(a) || 0)).slice(0, 3);
  } catch (e) { console.warn("home-blog:", e.code || e.message); return; }
  if (!posts.length) return;

  const style = document.createElement("style");
  style.textContent = `
  .hb-sec{max-width:1400px;margin:0 auto;padding:0 32px 70px}
  .hb-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px;flex-wrap:wrap}
  .hb-head h2{font-size:26px;font-weight:700;color:#111827}
  .hb-all{background:#14213d;color:#fff;font-weight:700;font-size:14px;padding:11px 24px;border-radius:999px;text-decoration:none}
  .hb-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .hb-card{background:#fff;border:1px solid #eef0f2;border-radius:16px;overflow:hidden;text-decoration:none;color:inherit;display:block;transition:box-shadow .2s,transform .2s}
  .hb-card:hover{box-shadow:0 10px 24px rgba(0,0,0,.08);transform:translateY(-3px)}
  .hb-cover{height:120px;background:linear-gradient(135deg,#14213d,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:46px}
  .hb-body{padding:16px}
  .hb-cat{display:inline-block;font-size:12px;font-weight:700;color:#b45309;background:#fef3c7;padding:3px 10px;border-radius:999px;margin-bottom:8px}
  .hb-body h3{font-size:17px;line-height:1.4;color:#111827;margin-bottom:6px}
  .hb-body p{font-size:13px;color:#6b7280;line-height:1.6;margin-bottom:10px}
  .hb-meta{font-size:12px;color:#9ca3af}
  [data-theme="dark"] .hb-head h2,[data-theme="dark"] .hb-body h3{color:#f9fafb}
  [data-theme="dark"] .hb-card{background:#0f172a;border-color:#1f2937}
  @media(max-width:900px){.hb-grid{grid-template-columns:1fr}.hb-sec{padding:0 16px 50px}}`;
  document.head.appendChild(style);

  const sec = document.createElement("section");
  sec.className = "hb-sec";
  sec.innerHTML = `
    <div class="hb-head"><h2>📝 সর্বশেষ ব্লগ</h2><a class="hb-all" href="${blogUrl("")}">সব পোস্ট দেখুন →</a></div>
    <div class="hb-grid">${posts.map(p => {
      const d = dOf(p);
      return `<a class="hb-card" href="${blogUrl("post/?id=" + encodeURIComponent(p.id))}">
        <div class="hb-cover">${esc(p.emoji || "📝")}</div>
        <div class="hb-body">
          ${p.category ? `<span class="hb-cat">${esc(p.category)}</span>` : ""}
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.excerpt || "")}</p>
          <div class="hb-meta">${d ? bn(d.toLocaleDateString("en-GB")) + " · " : ""}${bn(mins(p.body))} মিনিট পড়া</div>
        </div></a>`;
    }).join("")}</div>`;

  const footer = document.querySelector("footer");
  if (footer) footer.parentNode.insertBefore(sec, footer);
  else (document.querySelector("main") || document.body).appendChild(sec);
})();
