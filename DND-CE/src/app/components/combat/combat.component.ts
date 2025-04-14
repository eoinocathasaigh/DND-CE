import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonImg, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CombatService } from '../../services/combat.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-combat',
  imports: [HttpClientModule, CommonModule, IonHeader, IonButton, IonCardContent, IonImg, IonCardTitle, IonCardHeader, IonCard, IonContent, IonTitle, IonToolbar],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.css'
})
export class CombatComponent implements OnInit {
  encounters: any[] = [];

  constructor(private combatService: CombatService) {}

  //On creation of the page we load in all the encounters from the database
  ngOnInit() {
    this.loadEncounters();
  }

  //METHODS FROM OUR SERVICE - INTERACT WITH THE METHODS/ROUTES IN OUR SERVICE
  //Method to load in all encounters - subscribe to this event so we can get all encounters
  loadEncounters() {
    this.combatService.getCombatEncounters().subscribe((data: any[]) => {
      this.encounters = data;
    });
  }

  //Method that will be used to delete an encounter
  deleteEncounter(id: string) {
    this.combatService.deleteCombatEncounter(id).subscribe(() => {
      this.loadEncounters();
    });
  }

}
