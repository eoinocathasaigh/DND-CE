import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Ensure HttpClientModule is imported
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonImg, IonList, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CombatService } from '../../services/combat.service';

@Component({
  selector: 'app-combat',
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule, // Ensure HttpClientModule is imported
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

  constructor(private combatService: CombatService) {}

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

  // Play encounter (placeholder for now)
  playEncounter(id: string): void {
    console.log(`Play encounter with ID: ${id}`);
  }

  // Delete an encounter
  deleteEncounter(id: string): void {
    this.combatService.deleteCombatEncounter(id).subscribe(() => {
      this.loadEncounters(); // Reload encounters after deletion
    });
  }
}