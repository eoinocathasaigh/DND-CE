import { Component } from '@angular/core';
import { IonFooter, IonToolbar, IonButtons, IonButton, IonImg } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [IonImg, IonButton, IonButtons, IonToolbar, IonFooter, ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router: Router) {}

  goToDice() {
    this.router.navigate(['/dice']); // if you have a route
  }
  
  goToCombat() {
    this.router.navigate(['/combat']);
  }
  
  goToCharacter() {
    this.router.navigate(['/character']);
  }
}
