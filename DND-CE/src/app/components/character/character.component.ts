import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonMenuButton, IonContent, IonFab, IonFabButton, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-character',
  imports: [IonIcon, IonFabButton, IonFab, IonContent, IonTitle, IonButtons, IonToolbar, IonHeader, IonMenuButton],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {

  onClick() {
    console.log('Button clicked!');
  }
}
