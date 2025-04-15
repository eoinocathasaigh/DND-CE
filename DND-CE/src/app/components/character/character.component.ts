import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonButton, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle } from "@ionic/angular/standalone";
import { CharacterService } from '../../services/character.service'; 

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  imports: [CommonModule, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonButton, IonIcon, IonContent],
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  characters: any[] = []; // Declare the characters property

  constructor(private router: Router, private characterService: CharacterService) {}

  ngOnInit() {
    this.fetchCharacters();
  }

  // Fetch characters from the service
  fetchCharacters() {
    this.characterService.getCharacters().subscribe(
      (res) => {
        this.characters = Array.isArray(res) ? res : []; 
      },
      (err) => console.error('Failed to fetch characters:', err)
    );
}

  // Navigate to the character sheet maker
  goToCharacterSheetMaker() {
    this.router.navigate(['/character-sheet-maker']);
  }

  // Navigate to the character sheet for a specific character
  goToCharacterSheet(character: any) {
    this.router.navigate(['/character-sheet', character._id]);
  }
}
