import { Component } from '@angular/core';
import { IonContent, IonImg, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  imports: [IonLabel, IonItem, IonList, IonImg, IonContent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  

}
