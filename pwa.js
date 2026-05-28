let deferredInstallPrompt = null;
const installButton = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installButton) {
    installButton.style.display = 'inline-flex';
  }
});

window.addEventListener('appinstalled', () => {
  console.log('تطبيق بثوكي تم تثبيته');
  if (installButton) {
    installButton.style.display = 'none';
  }
});

function installApp() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') {
      console.log('المستخدم قبل تثبيت التطبيق');
    }
    deferredInstallPrompt = null;
    if (installButton) {
      installButton.style.display = 'none';
    }
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service worker مسجل بنجاح'))
      .catch(err => console.error('فشل تسجيل service worker:', err));
  });
}
