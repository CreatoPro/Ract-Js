import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initializeFirebase, askForPermissionToReceiveNotifications, saveNotification } from "./push-notification";
//import serviceWorker from "./serviceWorker";
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import store from './_helpers/store';

ReactDOM.render(
 <Provider store={store}>
    <App />
</Provider>, 
document.getElementById('root'));

//serviceWorker();
serviceWorker.register();

initializeFirebase();
//console.log(">> In Index.js initializeFirebase().....");
if(!localStorage.getItem("notification-token")) {
    //console.log("In Index.js notification-token not exists!...");
    askForPermissionToReceiveNotifications();
}
else {
    navigator.serviceWorker.addEventListener("message", (messageEvent) => {
        //console.log(">> Index.js Notification Mesage Received : "+JSON.stringify(messageEvent.data));
        /*
        {"firebaseMessaging":{"type":"notification-clicked",
        "payload":{"data":{"resourceSubTypeId":"0","resourceId":"0",
        "gcm.notification.sound":"default","resourceTypeId":"0","messageId":"1471",
        "message":"Testing PWA push msg"},"from":"999041119542","priority":"high",
        "notification":{"title":"Triangles-iLearn","body":"Testing PWA push msg",
        "click_action":"FCM_PLUGIN_ACTIVITY"},"collapse_key":"do_not_collapse"}}}
        */
       /*{"firebaseMessaging":{"type":"push-received",..... */
        let notificationJSON = messageEvent.data.firebaseMessaging.payload.data;
        if(notificationJSON) {
            saveNotification(notificationJSON);
        }
       
    });
}


