import { Component } from '@angular/core';
import { IonButtons, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  imports: [IonLabel, IonItem, IonList, IonImg, IonContent, IonTitle, IonMenuButton, IonButtons, IonToolbar, IonHeader],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
