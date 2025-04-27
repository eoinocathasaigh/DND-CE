import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

// This service is responsible for handling notifications in the application.
export class NotificationService {
  requestPermission() {
    // Check if the browser supports notifications
    if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
            // Check the permission status
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } 
            // Check if the permission was denied
            else if (permission === 'denied') {
                console.warn('Notification permission denied.');
            } 
            // Check if the permission was dismissed
            else {
                console.warn('Notification permission dismissed or blocked.');
            }
        }).catch((error) => { // Handle any errors that occur during the permission request
            console.error('Error requesting notification permission:', error);
        });
    } 
    // Check if the browser does not support notifications
    else {
        console.error('Notifications are not supported in this browser.');
    }
  }

// Method to send a notification
sendNotification(title: string, body: string) {
    // Check if the browser supports notifications
    if (Notification.permission === 'granted') {
        // Create a new notification
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(title, {
                    body,
                    icon: 'assets/img/appLogo.svg',
                });
            });
        }
    } 
    // Check if the permission is not granted yet
    else {
        console.error('Notification permission has not been granted.');
    }
  }

}