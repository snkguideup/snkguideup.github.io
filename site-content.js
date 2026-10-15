// SNK Ai Academy - পাবলিক সাইটে Firestore থেকে কনটেন্ট দেখানো
// ডেটা না থাকলে বা এরর হলে সাইটের আগের (ডিফল্ট) কনটেন্টই থাকবে।
import { db } from "./firebase-config.js";
import { doc, getDoc, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const safeUrl = (u) => (/^\s*(javascript|data|vbscript):/i.test(u || "") ? "#" : (u || "#"));
const lang = localStorage.getItem("snk-lang") || "bn";

async function list(name) {
  const snap = await getDocs(query(collection(db, name), orderBy("createdAt", "asc")));
  return snap.docs.map((d) => d.data());
}

function setBi(el, bn, en) {
  if (!el || (!bn && !en)) return;
  if (bn) el.setAttribute("data-bn", bn);
  if (en) el.setAttribute("data-en", en);
  el.textContent = el.getAttribute(lang === "en" ? "data-en" : "data-bn") || "";
}

function applySite(d) {
  // হিরো
  const badge = document.querySelector(".new-badge");
  if (badge && d.badge) {
    for (const n of badge.childNodes) {
      if (n.nodeType === 3 && n.textContent.trim()) { n.textContent = " " + d.badge + " "; break; }
    }
  }
  setBi(document.querySelector(".hero-left h1 > span[data-bn]"), d.headlineBn, d.headlineEn);
  setBi(document.querySelector(".hero-left h1 .highlight > span[data-bn]"), d.highlightBn, d.highlightEn);
  setBi(document.querySelector(".hero-sub"), d.subBn, d.subEn);
  setBi(document.querySelector(".hero-left .btn-cta span[data-bn]"), d.ctaBn, d.ctaEn);

  // প্রোমো ব্যানার
  const promo = document.querySelector(".promo-banner");
  if (promo) {
    if (d.promoIcon) promo.querySelector(".interview-icon").textContent = d.promoIcon;
    if (d.promoTitle) promo.querySelector("h3").textContent = d.promoTitle;
    if (d.promoText) promo.querySelector("p").textContent = d.promoText;
    const b = promo.querySelector(".btn-interview");
    if (b && d.promoBtn) b.innerHTML = esc(d.promoBtn) + ' <span class="arrow-icon">→</span>';
    if (b && d.promoLink) b.setAttribute("href", safeUrl(d.promoLink));
  }

  // ফুটারের যোগাযোগ
  const ul = document.querySelector(".footer-contact");
  if (ul) {
    const items = [];
    if (d.footerEmail) items.push("✉️ " + esc(d.footerEmail));
    if (d.footerPhone) items.push("📞 " + esc(d.footerPhone));
    if (d.footerAddress) items.push("📍 " + esc(d.footerAddress));
    if (d.footerHours) items.push("🕐 " + esc(d.footerHours));
    if (items.length) ul.innerHTML = items.map((t) => "<li>" + t + "</li>").join("");
  }
}

function renderCourses(items) {
  const grid = document.querySelector(".course-grid");
  if (!grid) return;
  const seeAll = grid.querySelector(".see-all-row"); // "সব দেখুন" বাটন যেন মুছে না যায়
  grid.innerHTML = items.map((c, i) =>
    '<div class="course-card">' +
      '<div class="course-thumb thumb-' + ((i % 5) + 1) + '"><div class="thumb-text">' + esc(c.title) + "</div></div>" +
      '<div class="course-body">' +
        '<div class="course-meta"><span>ব্যাচ-' + esc(c.batch) + "</span><span>🪑 " + esc(c.seats) + " সিট বাকি</span><span>🕐 " + esc(c.days) + " দিন বাকি</span></div>" +
        "<h4>" + esc(c.title) + "</h4>" +
        '<div class="course-season-btns"><a href="#" class="btn-season btn-season-free">সিজন-১ ফ্রি</a><a href="admission/" class="btn-season btn-season-paid">সিজন-২ পেইড</a></div>' +
      "</div></div>"
  ).join("");
  if (seeAll) grid.after(seeAll);
}

function renderPartners(items) {
  const box = document.querySelector(".partner-logos");
  if (!box) return;
  box.innerHTML = items.map((p) =>
    '<a href="' + esc(safeUrl(p.link)) + '" target="_blank" rel="noopener" class="p-logo-box">' + esc(p.name) + "</a>"
  ).join("");
}

function renderTestimonials(items) {
  const box = document.querySelector(".testimonial-grid");
  if (!box) return;
  box.innerHTML = items.map((t, i) => {
    const initials = String(t.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
    return '<div class="testimonial-card"><span class="quote-icon">❞</span><p>' + esc(t.text) + "</p>" +
      '<div class="testimonial-person"><span class="avatar avatar-' + ((i % 6) + 1) + '">' + esc(initials) + "</span>" +
      "<div><strong>" + esc(t.name) + "</strong><small>" + esc(t.course) + "</small></div></div></div>";
  }).join("");
}

(async () => {
  try { const s = await getDoc(doc(db, "site", "home")); if (s.exists()) applySite(s.data()); } catch (e) { console.warn("site", e); }
  try { const c = await list("courses"); if (c.length) renderCourses(c); } catch (e) { console.warn("courses", e); }
  try { const p = await list("partners"); if (p.length) renderPartners(p); } catch (e) { console.warn("partners", e); }
  try { const t = await list("testimonials"); if (t.length) renderTestimonials(t); } catch (e) { console.warn("testimonials", e); }
})();
