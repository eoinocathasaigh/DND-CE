import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonImg, IonList, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CombatService } from '../../services/combat.service';

@Component({
  selector: 'app-combat',
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonTitle,
    IonToolbar,
    IonList,
    IonText
  ],
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css']
})
export class CombatComponent implements OnInit {
  encounters: any[] = []; // Array to store combat encounters
  loading: boolean = true; // To show a loading spinner
  error: string | null = null; // To handle errors

  constructor(private combatService: CombatService, private router: Router) {}

  ngOnInit(): void {
    this.loadEncounters();
  }

  // Fetch combat encounters from the server
  loadEncounters(): void {
    this.loading = true;
    this.error = null;

    this.combatService.getCombatEncounters().subscribe(
      (data: any) => {
        this.encounters = data.myEncounter || []; // Assign the fetched data
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching combat encounters:', error);
        this.error = 'Failed to load combat encounters. Please try again later.';
        this.loading = false;
      }
    );
  }

  //Play encounter
  playEncounter(encounterId: string) {
    //Navigate to the play encounter page
    this.router.navigate(['/playCombat/' + encounterId, encounterId]);
  }

  //Delete an encounter
  deleteEncounter(id: string): void {
    this.combatService.deleteCombatEncounter(id).subscribe({
      next: () => {
        this.loadEncounters(); //Reload encounters after deletion
      },
      error: (err) => {
        console.error(`Error deleting encounter with ID ${id}:`, err);
      },
    });
  }
}