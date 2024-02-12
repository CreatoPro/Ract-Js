/*if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }*/

importScripts("https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.15.1/firebase-messaging.js");
console.log("In public firebase-messaging-sw......");
firebase.initializeApp({
  apiKey: "AIzaSyBPJztL4oJRKJhOa6ibGXWEvtzXD1rsC7M",
  authDomain: "fresh-yen-802.firebaseapp.com",
  databaseURL: "https://fresh-yen-802.firebaseio.com",
  projectId: "fresh-yen-802",
  storageBucket: "fresh-yen-802.appspot.com",
  messagingSenderId: "999041119542",
  appId: "1:999041119542:web:ff82d43596b1393583af97"
});
const messaging = firebase.messaging();
console.log("In public firebase-messaging-sw......1");
messaging.setBackgroundMessageHandler(function(payload) {
    const promiseChain = clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          windowClient.postMessage(payload);
        }
      })
      .then(() => {
        return registration.showNotification("my notification title");
      });
    return promiseChain;
  });
  self.addEventListener('notificationclick', function(event) {
    // do what you want
    console.log("In public firebase-messaging-sw; Notification Clicked!...");
  });
