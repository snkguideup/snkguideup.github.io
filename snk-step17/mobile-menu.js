// SNK mobile-menu.js — ছোট স্ক্রিনে হ্যামবার্গার মেনু (Firebase লাগে না, শুধু JS)
// যে পেজে হেডার আছে, সেখানে </body>-এর আগে এই এক লাইন যোগ করুন (গভীরতা অনুযায়ী ../ বদলাবে):
//   <script src="mobile-menu.js"></script>
(function () {
  var inner = document.querySelector(".header-inner");
  var nav = document.querySelector(".nav-menu");
  if (!inner || !nav || document.getElementById("mmBtn")) return;

  var css = document.createElement("style");
  css.textContent = [
    ".mm-btn{display:none;height:38px;width:38px;border-radius:999px;border:none;background:#f3f4f6;color:#1f2937;font-size:18px;cursor:pointer;align-items:center;justify-content:center;flex-shrink:0}",
    ".mm-over{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000}",
    ".mm-drawer{position:fixed;top:0;right:0;height:100%;width:290px;max-width:86vw;background:#fff;z-index:1001;transform:translateX(100%);transition:transform .25s;display:flex;flex-direction:column;box-shadow:-10px 0 30px rgba(0,0,0,.15)}",
    ".mm-open .mm-drawer{transform:translateX(0)}.mm-open .mm-over{display:block}.mm-open{overflow:hidden}",
    ".mm-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;background:#14213d;color:#fff;font-weight:700}",
    ".mm-x{background:transparent;border:none;color:#fff;font-size:20px;cursor:pointer}",
    ".mm-list{padding:10px;overflow-y:auto;flex:1}",
    ".mm-link,.mm-grp{display:flex;align-items:center;justify-content:space-between;width:100%;padding:13px 14px;border-radius:10px;font:600 15px 'Hind Siliguri',sans-serif;color:#1f2937;background:transparent;border:none;text-align:left;cursor:pointer;text-decoration:none}",
    ".mm-link:hover,.mm-grp:hover{background:#f3f4f6;color:#d97706}",
    ".mm-sub{display:none;padding:0 0 6px 14px}.mm-sub.on{display:block}",
    ".mm-sub .mm-link{font-weight:500;font-size:14px}",
    ".mm-cta{margin:10px;background:#ffc72c;color:#111827;text-align:center;font-weight:700;padding:13px;border-radius:999px;text-decoration:none;font-family:'Hind Siliguri',sans-serif}",
    "@media(max-width:1100px){.mm-btn{display:flex}}",
    "@media(min-width:1101px){.mm-drawer,.mm-over{display:none!important}}",
    "@media(max-width:560px){.btn-login{padding:9px 12px;font-size:12px}.header-inner{gap:10px}.header-right{gap:8px}}",
    "[data-theme='dark'] .mm-btn{background:#1f2937;color:#e5e7eb}",
    "[data-theme='dark'] .mm-drawer{background:#0f172a}",
    "[data-theme='dark'] .mm-link,[data-theme='dark'] .mm-grp{color:#e5e7eb}",
    "[data-theme='dark'] .mm-link:hover,[data-theme='dark'] .mm-grp:hover{background:#1f2937}"
  ].join("\n");
  document.head.appendChild(css);

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // বর্তমান নেভ মেনু থেকেই লিংক কপি করা হয় (তাই পথ নিজে থেকে ঠিক থাকে)
  var html = "";
  Array.prototype.forEach.call(nav.children, function (el) {
    if (el.classList.contains("nav-item-dropdown")) {
      var label = el.querySelector(".nav-link");
      var subs = el.querySelectorAll(".dropdown-item");
      html += '<button class="mm-grp" type="button">' + esc((label ? label.textContent : "").replace("⌄", "").trim()) + '<span>⌄</span></button><div class="mm-sub">';
      Array.prototype.forEach.call(subs, function (a) { html += '<a class="mm-link" href="' + esc(a.getAttribute("href")) + '">' + esc(a.textContent.trim()) + "</a>"; });
      html += "</div>";
    } else if (el.tagName === "A") {
      html += '<a class="mm-link" href="' + esc(el.getAttribute("href")) + '">' + esc(el.textContent.trim()) + "</a>";
    }
  });
  var login = document.querySelector(".btn-login");

  var drawer = document.createElement("div");
  drawer.innerHTML =
    '<div class="mm-over"></div><aside class="mm-drawer" aria-label="মেনু">' +
    '<div class="mm-head"><span>মেনু</span><button class="mm-x" type="button" aria-label="বন্ধ">✕</button></div>' +
    '<div class="mm-list">' + html + "</div>" +
    (login ? '<a class="mm-cta" href="' + esc(login.getAttribute("href")) + '">লগইন / সাইন আপ →</a>' : "") +
    "</aside>";
  document.body.appendChild(drawer);

  var btn = document.createElement("button");
  btn.id = "mmBtn"; btn.className = "mm-btn"; btn.type = "button"; btn.setAttribute("aria-label", "মেনু খুলুন"); btn.textContent = "☰";
  inner.appendChild(btn);

  function open() { document.documentElement.classList.add("mm-open"); }
  function close() { document.documentElement.classList.remove("mm-open"); }
  btn.addEventListener("click", open);
  drawer.querySelector(".mm-over").addEventListener("click", close);
  drawer.querySelector(".mm-x").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  Array.prototype.forEach.call(drawer.querySelectorAll(".mm-grp"), function (g) {
    g.addEventListener("click", function () { g.nextElementSibling.classList.toggle("on"); });
  });
  Array.prototype.forEach.call(drawer.querySelectorAll("a"), function (a) { a.addEventListener("click", close); });
})();
