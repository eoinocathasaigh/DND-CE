import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ <-- Add this

// Ionic standalone components
import {
  IonButton,
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
    FormsModule, // ✅ <-- Required for ngModel to work
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
    IonContent
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

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadEncounter();
  }

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

  addFighter() {
    if (this.nameInput && this.hp !== null && this.initiative !== null) {
      this.fighters.push({ name: this.nameInput, hp: this.hp, initiative: this.initiative });
      this.nameInput = '';
      this.hp = null;
      this.initiative = null;
    }
  }

  saveEncounter() {
    const updatedEncounter = {
      name: this.name,
      fighters: this.fighters
    };

    this.http.put(`http://localhost:5000/api/CombatTracker/${this.id}`, updatedEncounter).subscribe({
      next: () => this.router.navigate(['/Combat']),
      error: (err) => console.error('Error saving encounter:', err)
    });
  }

  getSortedFighters() {
    return this.fighters.slice().sort((a, b) => b.initiative - a.initiative);
  }
}
