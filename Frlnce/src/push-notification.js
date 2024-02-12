import firebase from "firebase/app";
import "firebase/messaging";
import Utils from "./_helpers/utils";
import ApiService from "./_services/ApiService";

export const initializeFirebase = () => {
    //console.log("In push-notification.js; initializeFirebase()...");
    const config = {
            apiKey: "AIzaSyBPJztL4oJRKJhOa6ibGXWEvtzXD1rsC7M",
            projectId: "fresh-yen-802",
            messagingSenderId: "999041119542",
            appId: "1:999041119542:web:ff82d43596b1393583af97"
    };

    firebase.initializeApp(config);
}

export const askForPermissionToReceiveNotifications = async () => {
    //alert("IN askForPermissionToReceiveNotifications...");
    //console.log("In push-notification.js; askForPermissionToReceiveNotifications()...");
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        //console.log("token : ", token);
        localStorage.setItem("notification-token", token);
        //alert("IN askForPermissionToReceiveNotifications >> Token :"+token);
        //console.log("In push-notification.js; askForPermissionToReceiveNotifications() >> Token :"+token);
        return token
        
    } catch (error) {
        //alert("IN askForPermissionToReceiveNotifications >> Error :"+error);
        console.log("In push-notification.js; askForPermissionToReceiveNotifications() >> Error :"+error);
        console.error(error);
    }
}

export const saveNotification = (notificationData) =>{
    //console.log("In push-notification.js; savePushNotification()..."+JSON.stringify(notificationData));
    let notificationDate = Utils.formatStringDateWithTime(new Date());
    notificationData.receivedDate = notificationDate;
    notificationData.status = 0; //0: UnRead ; 1: Read
    let notificationMsgs = localStorage.getItem('ilearn-notifications');
    let notificationJSONArray = [];
    if(notificationMsgs) {
        notificationJSONArray = JSON.parse(notificationMsgs);    
    }
    notificationJSONArray.push(notificationData)
    localStorage.setItem('ilearn-notifications', JSON.stringify(notificationJSONArray));
}

export const getUnReadNotificationCount = () =>{
    //console.log("In push-notification.js; getUnReadNotificationCount()...");
    let notificationCount = 0;
    let notificationMsgs = localStorage.getItem('ilearn-notifications');
    let notificationJSONArray = [];
    if(notificationMsgs) {
        notificationJSONArray = JSON.parse(notificationMsgs);    
    }
    notificationJSONArray.forEach((notification) => {
        if(notification.status == 0) {
            notificationCount++;
        }
    });
    return notificationCount;
}

export const markNotificationsAsRead = () =>{
    //console.log("In push-notification.js; markNotificationsAsRead()... ");
    let notificationMsgs = localStorage.getItem('ilearn-notifications');
    let notificationJSONArray = [];
    let readNotificationJSONArray = [];
    if(notificationMsgs) {
        notificationJSONArray = JSON.parse(notificationMsgs);    
    }
    notificationJSONArray.forEach((notification) => {
      notification.status = 1;
      readNotificationJSONArray.push(notification);
    });
    localStorage.setItem('ilearn-notifications', JSON.stringify(readNotificationJSONArray));
}

export const checkNewNotificationsOnServer = async () =>{
    //console.log("In push-notification.js; checkNewNotificationsOnServer()... ");
    ApiService.getNotificationMessages()
    .then((res) => {
      let newNotifications = res.data.data;
      //console.log("In push-notification.js; checkNewNotificationsOnServer(); res : "+JSON.stringify(newNotifications));
      let notificationMsgs = localStorage.getItem('ilearn-notifications');
      let notifications =  notificationMsgs?JSON.parse(notificationMsgs):[];
      let _notifications = notifications;
      newNotifications.forEach(newNotification => {
        let isAlreadyExists = false;
        notifications = _notifications;
        //console.log("New NotificationId : "+newNotification.messageId);
        notifications.forEach(existingNotification => {
            //console.log("Existing NotificationId : "+existingNotification.messageId+"==="+newNotification.messageId+"<<>>"+existingNotification.messageId===newNotification.messageId);
            if(existingNotification.message===newNotification.message) {
                isAlreadyExists = true;
            }  
        }); 
        if(!isAlreadyExists) {
            newNotification.status = 0;
            newNotification.receivedDate = newNotification.sendDate;
            _notifications.push(newNotification);
        }
      });
      localStorage.setItem('ilearn-notifications', JSON.stringify(_notifications));
    },
    error => { //ErrorCB
      //console.log("In push-notification.js; Connection Error...");
    });
}
