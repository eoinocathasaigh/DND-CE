import { CommonModule } from '@angular/common';
import { Component , OnInit, OnDestroy} from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Motion } from '@capacitor/motion';

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
    IonHeader,
    CommonModule
  ],
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit, OnDestroy {
  selectedDice: number | null = null; // Stores the selected dice sides
  result: number | null = null; // Stores the result of the dice roll
  private shakeThreshold = 15; // Adjust sensitivity
  private lastShakeTime = 0;
  
  // Roll the dice
  rollDice(): void {
    if (this.selectedDice) {
      this.result = Math.floor(Math.random() * this.selectedDice) + 1;
    } else {
      console.error('No dice selected!');
    }
  }

  // Store motion listener ref
  private removeMotionListener: (() => Promise<void>) | null = null;

  ngOnInit(): void {
    this.listenToShake();
  }

  ngOnDestroy(): void {
    if (this.removeMotionListener) {
      this.removeMotionListener();
    }
  }

  //Method to listen for a shake on the device
  private listenToShake() {
    //Adding a motion/acceleration listener to check to see if a device is shaken
    Motion.addListener('accel', (event) => {
      const { acceleration } = event;

      if (!acceleration) return;

      const totalAcceleration = Math.sqrt(
        (acceleration.x ?? 0) ** 2 +
        (acceleration.y ?? 0) ** 2 +
        (acceleration.z ?? 0) ** 2
      );

      const now = Date.now();

      //We check if the total acceleration is greater than the shake threshold and if the last shake time was more than 1 second ago
      //If so, we set the last shake time to now and roll the dice
      if (totalAcceleration > this.shakeThreshold && now - this.lastShakeTime > 1000) {
        this.lastShakeTime = now;
        console.log('Shake detected');
        this.rollDice();
      }
    }).then(listenerHandle => {
      this.removeMotionListener = listenerHandle.remove;
    });
  }
}