// SNK Ai Academy - অ্যাডমিশন পেজের "পেমেন্ট সম্পন্ন করি" বাটন
// লিংক বসে অ্যাডমিন > কনটেন্ট এডিটর > 💳 পেমেন্ট ট্যাব থেকে, কোড বদলাতে হয় না।
import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const btn = document.querySelector(".payment-submit-btn");
if (btn) {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let link = "";
    let note = "পেমেন্ট সিস্টেম শীঘ্রই চালু হচ্ছে। এখনই ভর্তি হতে আমাদের সাথে যোগাযোগ করুন।";
    try {
      const s = await getDoc(doc(db, "site", "home"));
      if (s.exists()) {
        link = (s.data().paymentLink || "").trim();
        if (s.data().paymentNote) note = s.data().paymentNote;
      }
    } catch (err) { console.warn(err); }

    if (/^https?:\/\//i.test(link)) {
      window.location.href = link;
    } else {
      alert(note);
    }
  });
}
