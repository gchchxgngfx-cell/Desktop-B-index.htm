const liveStatus = document.getElementById('live-status');
const isLive = true;

if (liveStatus) {
  liveStatus.textContent = isLive ? 'مباشر الآن' : 'قريباً';
}

// شغل الفيديو تلقائيًا عند تحميل الصفحة
window.addEventListener('load', () => {
  const liveVideo = document.getElementById('liveVideo');
  if (liveVideo) {
    liveVideo.play().catch(() => {
      // في بعض المتصفحات قد يتطلب تفاعل المستخدم
      console.warn('تشغيل الفيديو تلقائيًا فشل، الرجاء الضغط على الفيديو لبدء التشغيل.');
    });
  }
});

// مثال: عداد بسيط للتذكير بالبث القادم
const nextStream = new Date();
nextStream.setHours(nextStream.getHours() + 3);

function updateCountdown() {
  const now = new Date();
  const diff = nextStream - now;
  const timerElement = document.querySelector('.viewer-count');

  if (!timerElement) return;

  if (diff <= 0) {
    timerElement.textContent = 'البث بدأ الآن';
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  timerElement.textContent = `${hours}س ${minutes}د ${seconds}ث`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
