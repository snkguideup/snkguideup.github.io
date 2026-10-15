ধাপ ৫ - পেমেন্ট লিংক প্লেসহোল্ডার

1) payment-link.js            -> রুটে আপলোড
2) admin/content/index.html   -> আগেরটা রিপ্লেস (নতুন "💳 পেমেন্ট" ট্যাব যোগ হয়েছে)
3) admission পেজে </body> এর আগে:
   রুটে admission.html হলে:       <script type="module" src="payment-link.js"></script>
   admission/index.html হলে:     <script type="module" src="../payment-link.js"></script>

নিজের পেমেন্ট সিস্টেম রেডি হলে: admin/content > 💳 পেমেন্ট > লিংক বসিয়ে সেভ করুন।
