import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
  requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else if (permission === 'denied') {
                console.warn('Notification permission denied.');
            } else {
                console.warn('Notification permission dismissed or blocked.');
            }
        }).catch((error) => {
            console.error('Error requesting notification permission:', error);
        });
    } else {
        console.error('Notifications are not supported in this browser.');
    }
  }

sendNotification(title: string, body: string) {
    if (Notification.permission === 'granted') {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(title, {
                    body,
                    icon: 'assets/img/appLogo.svg',
                });
            });
        }
    } else {
        console.error('Notification permission has not been granted.');
    }
  }

}