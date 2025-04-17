import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-play-combat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonTitle,
    IonList,
    IonHeader,
    IonToolbar,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCard,
    IonContent,
    IonBackButton,
    IonButtons
  ],
  templateUrl: './play-combat.component.html',
  styleUrls: ['./play-combat.component.css']
})
export class PlayCombatComponent implements OnInit {
  id: string = '';
  name: string = '';
  fighters: any[] = [];

  nameInput: string = '';
  hp: number | null = null;
  initiative: number | null = null;

  //Constructor for initializing the different services and variables
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  //Initializing things like the id and then loading in the particular encounter
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadEncounter();
  }

  //Loading the encounter from the database using the id
  loadEncounter() {
    this.http.get<any>(`http://localhost:5000/api/CombatTracker`).subscribe({
      next: (data) => {
        const encounter = data.myEncounter.find((e: any) => e._id === this.id);
        if (encounter) {
          this.name = encounter.name;
          this.fighters = encounter.fighters;
        }
      },
      error: (err) => console.error('Error loading encounter:', err)
    });
  }

  //Adding a new fighter to the encounter
  //This is done by pushing the new fighter to the fighters array and then resetting the input fields
  addFighter() {
    if (this.nameInput && this.hp !== null && this.initiative !== null) {
      this.fighters.push({ name: this.nameInput, hp: this.hp, initiative: this.initiative });
      this.nameInput = '';
      this.hp = null;
      this.initiative = null;
    }
  }

  //Saving the current encounter to the database with all the newly added fighters included
  saveEncounter() {
    const updatedEncounter = {
      name: this.name,
      fighters: this.fighters
    };

    this.http.put(`http://localhost:5000/api/CombatTracker/${this.id}`, updatedEncounter).subscribe({
      next: () => this.router.navigate(['/combat']),
      error: (err) => console.error('Error saving encounter:', err)
    });
  }

  //Sorting each of the fighters by their initiative value -> highest to lowest
  getSortedFighters() {
    return this.fighters.slice().sort((a, b) => b.initiative - a.initiative);
  }

  //This method is used by our display to alter the fighters hp value
  adjustHp(fighter: any, change: number) {
    fighter.hp += change;
  
    //This will prevent there from being a negative hp value
    if (fighter.hp < 0) {
      fighter.hp = 0;
    }
  }  

  //Method for removing a fighter from the encounter (ie. they died)
  removeFighter(fighter: any) {
    const index = this.fighters.indexOf(fighter);
    if (index > -1) {
      this.fighters.splice(index, 1);
    }
  }
  
}
