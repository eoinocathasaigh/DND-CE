import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonImg, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-combat',
  imports: [CommonModule, IonHeader, IonButton, IonCardContent, IonImg, IonCardTitle, IonCardHeader, IonCard, IonContent, IonTitle, IonToolbar],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.css'
})
export class CombatComponent {

}
