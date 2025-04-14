import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [
    FormsModule, // Add FormsModule here
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonButton,
    IonRadio,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonRadioGroup,
    IonTitle,
    IonToolbar,
    IonHeader
  ],
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {
  selectedDice: number | null = null; // Stores the selected dice sides
  result: number | null = null; // Stores the result of the dice roll

  // Roll the dice
  rollDice(): void {
    if (this.selectedDice) {
      this.result = Math.floor(Math.random() * this.selectedDice) + 1;
    } else {
      console.error('No dice selected!');
    }
  }
}