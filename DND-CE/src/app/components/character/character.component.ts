import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonButton, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonItemOption, IonItemOptions, IonItem, IonItemSliding } from "@ionic/angular/standalone";
import { CharacterService } from '../../services/character.service'; 

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  imports: [IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader, CommonModule, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonButton, IonIcon, IonContent],
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

  //Function to delete a chatacter from the list & the server
  deleteCharacter(id: string) {
    if (confirm('Are you sure you want to delete this character?')) {
      this.characterService.deleteCharacter(id).subscribe(
        () => {
          this.characters = this.characters.filter(c => c._id !== id); // Optimistically remove from list
          console.log('Character deleted');
        },
        (err) => console.error('Failed to delete character:', err)
      );
    }
  }

  //Simple navigation function for each character 
  editCharacter(id: string) {
    this.router.navigate(['/character-update', id]);
  }

  // Navigate to the character sheet maker
  goToCharacterSheetMaker() {
    this.router.navigate(['/character-sheet-maker']);
  }

  // Navigate to the character sheet for a specific character
  goToCharacterSheet(character: any) {
    this.router.navigate(['/character-sheet', character._id]);
  }

  // Handle image error by setting a default image
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/appLogo.svg';
  }
}
