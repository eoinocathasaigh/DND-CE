import { Component } from '@angular/core';
import { IonFooter, IonToolbar, IonButton, IonImg } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [IonImg, IonButton, IonToolbar, IonFooter, ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router: Router) {}

  //The following functions are used to navigate to the different pages of the app
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
