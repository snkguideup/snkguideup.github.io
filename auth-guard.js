// SNK Ai Academy - পেজ গার্ড (লগইন ও রোল চেক) + লগআউট বাটন
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// যাচাই শেষ না হওয়া পর্যন্ত পেজ লুকানো থাকবে
document.documentElement.style.visibility = "hidden";

const loginUrl = new URL("login.html", import.meta.url).href;
const homeUrl = new URL("index.html", import.meta.url).href;

function dashboardFor(role) {
  if (role === "admin" || role === "superadmin") return new URL("admin/dashboard/", import.meta.url).href;
  if (role === "mentor") return new URL("mentor/", import.meta.url).href;
  if (role === "user") return new URL("user/", import.meta.url).href;
  return homeUrl;
}

const roleLabel = {
  user: "শিক্ষার্থী",
  mentor: "মেন্টর",
  admin: "অ্যাডমিন",
  superadmin: "সুপার অ্যাডমিন"
};

function addLogoutButton(user, role) {
  const box = document.createElement("div");
  box.style.cssText =
    "position:fixed;bottom:24px;left:24px;z-index:9999;display:flex;align-items:center;gap:10px;" +
    "background:#14213d;color:#fff;padding:10px 14px;border-radius:999px;" +
    "box-shadow:0 8px 24px rgba(0,0,0,.25);font-family:'Hind Siliguri',sans-serif;font-size:13px;";

  const info = document.createElement("span");
  info.textContent = (user.displayName || user.email) + " · " + (roleLabel[role] || role);

  const btn = document.createElement("button");
  btn.textContent = "লগআউট";
  btn.style.cssText =
    "background:#ffc72c;color:#111827;border:none;border-radius:999px;padding:6px 14px;" +
    "font-family:inherit;font-weight:700;font-size:13px;cursor:pointer;";
  btn.onclick = async () => {
    await signOut(auth);
    location.replace(loginUrl);
  };

  box.appendChild(info);
  box.appendChild(btn);
  document.body.appendChild(box);
}

export function guard(allowedRoles) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      location.replace(loginUrl);
      return;
    }
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      const role = snap.exists() ? snap.data().role : null;

      if (!role || !allowedRoles.includes(role)) {
        alert("এই পেজে ঢোকার অনুমতি আপনার নেই।");
        location.replace(dashboardFor(role));
        return;
      }

      window.snkUser = { uid: user.uid, email: user.email, name: user.displayName, role: role };
      addLogoutButton(user, role);
      document.documentElement.style.visibility = "visible";
    } catch (e) {
      location.replace(loginUrl);
    }
  });
}
