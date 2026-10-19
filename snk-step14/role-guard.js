// SNK role-guard.js — রোল অনুযায়ী পেজ লক (root ফোল্ডারে রাখুন)
// প্রতিটি লক-করা পেজের <head>-এ এই এক লাইন যোগ করুন (গভীরতা অনুযায়ী ../ বদলাবে):
//   <script type="module" src="../role-guard.js"></script>
import { auth, db } from "./firebase-config.js";
// ⚠️ ভার্সন (10.12.2) আপনার firebase-config.js এর সাথে মিলিয়ে নিন
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// কোন ফোল্ডারে কোন রোল ঢুকতে পারবে
const RULES = [
  { path: "/admin/",  roles: ["admin", "superadmin"] },
  { path: "/mentor/", roles: ["mentor", "admin", "superadmin"] },
  { path: "/user/",   roles: ["user", "mentor", "admin", "superadmin"] }
];

const here = location.pathname;
const rule = RULES.find(r => here.includes(r.path));
const loginUrl = new URL("login.html", import.meta.url).href;
const homeUrl = new URL("index.html", import.meta.url).href;

if (rule) {
  // যাচাই শেষ না হওয়া পর্যন্ত পেজ লুকানো থাকবে
  const hide = document.createElement("style");
  hide.id = "snk-guard-hide";
  hide.textContent = "html{visibility:hidden!important}";
  document.head.appendChild(hide);

  onAuthStateChanged(auth, async (user) => {
    if (!user) { location.replace(loginUrl); return; }
    let role = "user";
    try {
      const s = await getDoc(doc(db, "users", user.uid));
      if (s.exists() && s.data().role) role = s.data().role;
    } catch (e) { console.warn("role-guard:", e.code); }

    if (rule.roles.includes(role)) {
      document.getElementById("snk-guard-hide")?.remove();
      window.SNK_ROLE = role;
    } else {
      alert("এই পেজে আপনার প্রবেশাধিকার নেই।");
      location.replace(homeUrl);
    }
  });
}
