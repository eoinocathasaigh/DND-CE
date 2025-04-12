import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-character',
  imports: [IonButton, IonIcon, IonContent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  constructor(private router: Router) {}

  goToCharacterSheetMaker() {
    this.router.navigate(['/character-sheet-maker']);
  }
}
