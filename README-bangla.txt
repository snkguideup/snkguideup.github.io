ধাপ ৬ - মোবাইল অ্যাপ (PWA, ফ্রি)

রুটে আপলোড করুন (index.html এর পাশে):
  manifest.json, sw.js, pwa.js, এবং icons ফোল্ডার (icon-192.png, icon-512.png)

index.html এ যোগ করুন:
  <head> এর ভেতরে (</head> এর আগে):
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#14213d">
  </body> এর আগে:
    <script src="pwa.js"></script>

ফোনে Chrome এ সাইট খুলুন, "📲 অ্যাপ ইন্সটল করুন" বাটন আসবে (অথবা মেনু > Add to Home screen)।
