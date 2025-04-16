import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CombatService } from '../../services/combat.service';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-encounter',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonButton, IonItem, IonList, IonCardTitle, IonCardHeader, IonHeader, IonToolbar, IonButtons, IonContent, IonCard, IonLabel, IonCardContent, IonTitle, IonBackButton],
  templateUrl: './create-combat.component.html',
  styleUrls: ['./create-combat.component.css'],
})
export class CreateCombatComponent {
  name = ''; // Name of the encounter
  fighterName = ''; // Name of the fighter
  hp: number | null = null; // HP of the fighter
  initiative: number | null = null; // Initiative of the fighter
  fighters: any[] = []; // Array to store fighters

  constructor(private combatService: CombatService, private router: Router) {}

  // Add a fighter to the encounter
  addFighter() {
    if (this.fighterName && this.hp !== null && this.initiative !== null) {
      this.fighters.push({
        name: this.fighterName, // Use 'name' instead of 'type'
        hp: this.hp,
        initiative: this.initiative,
      });
      // Reset the input fields
      this.fighterName = '';
      this.hp = null;
      this.initiative = null;
    } else {
      console.error('All fighter fields must be filled out.');
    }
  }

  // Save the encounter to the database
  saveEncounter() {
    if (!this.name) {
      console.error('Encounter name is required.');
      return;
    }

    const newEncounter = {
      name: this.name,
      fighters: this.fighters,
    };

    this.combatService.addCombatEncounter(newEncounter).subscribe({
      next: () => {
        console.log('Encounter created successfully.');
        this.router.navigate(['/combat']); // Navigate back to the combat tracker page
      },
      error: (err) => console.error('Error creating encounter:', err),
    });
  }
}