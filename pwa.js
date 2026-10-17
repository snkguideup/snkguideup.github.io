// SNK Ai Academy - অ্যাপ হিসেবে ইন্সটল (PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (document.getElementById("pwaInstallBtn")) return;
  const b = document.createElement("button");
  b.id = "pwaInstallBtn";
  b.textContent = "📲 অ্যাপ ইন্সটল করুন";
  b.style.cssText = "position:fixed;bottom:24px;left:24px;z-index:998;background:#14213d;color:#fff;border:none;" +
    "border-radius:999px;padding:12px 18px;font-family:'Hind Siliguri',sans-serif;font-weight:700;font-size:14px;" +
    "cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.25);";
  b.onclick = async () => {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    b.remove();
  };
  document.body.appendChild(b);
});
window.addEventListener("appinstalled", () => {
  const b = document.getElementById("pwaInstallBtn");
  if (b) b.remove();
});
