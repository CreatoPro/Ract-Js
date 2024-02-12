/* Only register a service worker if it's supported */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        console.log('Service Worker registration successful', registration.scope);
      }, function(err) {
        console.log('Service Worker registration failed', err);
      }).catch(function(err) {
        console.log(err);
      });
    });
  } else {
    console.log('Service Worker is not supported by browser.');
  }
  
  /**
   * Warn the page must be served over HTTPS
   * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
   * Installability requires a service worker with a fetch event handler, and
   * if the page isn't served over HTTPS, the service worker won't load.
   */
  
  
  window.addEventListener('beforeinstallprompt', (event) => {
      console.log('👍', 'beforeinstallprompt', event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container
      //divInstall.classList.toggle('hidden', false);
    });
  
    
  
    window.addEventListener('appinstalled', (event) => {
      console.log('👍', 'appinstalled', event);
    });