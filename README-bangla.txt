SNK Ai Academy - সব নতুন ফাইল একসাথে (ধাপ ২ - ৭)

আপলোড (GitHub > Add file > Upload files, ফোল্ডার সহ টেনে ছাড়ুন):
  রুটে: firebase-config.js, auth-guard.js, login.html, site-content.js,
        payment-link.js, usha-brain.js, manifest.json, sw.js, pwa.js, icons/
  admin/content/index.html, admin/users/index.html

firestore.rules.txt -> GitHub এ নয়। Firebase Console > Firestore > Rules এ পেস্ট করে Publish।

পুরনো ফাইলে হাতে যোগ করতে হবে:

[index.html] <head> এর শেষে:
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#14213d">
[index.html] </body> এর আগে (script.js এর নিচে):
  <script src="usha-brain.js"></script>
  <script type="module" src="site-content.js"></script>
  <script src="pwa.js"></script>

[অ্যাডমিশন পেজ] </body> এর আগে (রুটে admission.html হলে; ফোল্ডারে হলে ../ দিন):
  <script type="module" src="payment-link.js"></script>
  <script src="usha-brain.js"></script>

[admin/dashboard/index.html] </body> এর আগে:
  <script type="module">import { guard } from "../../auth-guard.js"; guard(["admin","superadmin"]);</script>
[mentor/index.html] </body> এর আগে:
  <script type="module">import { guard } from "../auth-guard.js"; guard(["mentor","admin","superadmin"]);</script>
[user/index.html] </body> এর আগে:
  <script type="module">import { guard } from "../auth-guard.js"; guard(["user","mentor","admin","superadmin"]);</script>

Firebase Console: Authentication > Settings > Authorized domains এ snkguideup.github.io যোগ করুন।
এডিটর: /admin/content/  রোল: /admin/users/
