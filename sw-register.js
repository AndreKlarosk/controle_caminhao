if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => console.log('SW registered'));
  }
  
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('btn-install').classList.remove('hidden');
  });
  
  document.getElementById('btn-install').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt = null;
  });
