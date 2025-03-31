import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonItem, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-navbar',
  imports: [IonList, IonItem, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

}
