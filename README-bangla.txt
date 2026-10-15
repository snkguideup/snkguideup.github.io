SNK Ai Academy - ধাপ ৪ (ফাইনাল)

নতুন ফাইল (GitHub এ আপলোড করুন):
1) site-content.js              -> রুটে (index.html এর পাশে)
2) admin/content/index.html     -> নতুন ফোল্ডার admin/content/ এর ভেতরে
3) admin/users/index.html       -> নতুন ফোল্ডার admin/users/ এর ভেতরে

পুরনো ফাইলে ১ লাইন যোগ:
index.html এ </body> এর ঠিক আগে:
<script type="module" src="site-content.js"></script>

(ফুটারের যোগাযোগ তথ্য সব পেজে বদলাতে চাইলে প্রতিটি পেজের </body> এর আগে ../site-content.js (ফোল্ডার পেজে) বা site-content.js (রুট পেজে) যোগ করুন।)

এডিটর লিংক:
https://snkguideup.github.io/admin/content/
https://snkguideup.github.io/admin/users/
