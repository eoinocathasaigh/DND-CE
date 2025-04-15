import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { IonCard, IonCardHeader, IonContent, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  imports: [CommonModule, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader, TitleCasePipe, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonContent],

  styleUrls: ['./character-sheet.component.css'],
})
export class CharacterSheetComponent  implements OnInit {
  character: any;

  constructor( private route: ActivatedRoute, private characterService: CharacterService) {}
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterService.getCharacterById(id).subscribe(
        (data) => this.character = data,
        (err) => console.error('Error fetching character:', err)
      );
    }
  }


}
