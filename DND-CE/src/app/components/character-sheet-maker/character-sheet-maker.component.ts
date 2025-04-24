import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule  } from '@angular/forms';
import { IonButton, IonTextarea, IonLabel, IonItem, IonListHeader, IonInput, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from "@ionic/angular/standalone";
import { CharacterService } from '../../services/character.service'; 

@Component({
  selector: 'app-character-create',
  templateUrl: './character-sheet-maker.component.html',
  imports: [IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader, IonText, CommonModule, ReactiveFormsModule, IonContent, IonInput, IonListHeader, IonItem, IonListHeader, IonInput, IonTextarea, IonButton, IonButton, IonContent, IonItem, IonLabel],
  styleUrls: ['./character-sheet-maker.component.css'],
})
export class CharacterSheetMakerComponent {
  characterForm: FormGroup;
  
  // Constructor to initialize the form and inject services
  constructor(private fb: FormBuilder, private characterService: CharacterService, private router: Router) {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      img: [''],
      race: ['', Validators.required],
      class: ['', Validators.required],
      level: [1, [Validators.required, Validators.min(1)]],
      alignment: ['', Validators.required],
      armorClass: [10, [Validators.required, Validators.min(1)]],
      initiative: [2, [Validators.required, Validators.min(-20), Validators.max(20)]],
      speed: [30, [Validators.required, Validators.min(1)]],
      proficiencyBonus: [2, [Validators.required, Validators.min(1), Validators.max(10)]],
      hitPoints: [10, [Validators.required, Validators.min(1)]],
      hitDice: ['1d10', Validators.required],
      hitPointMax: [10, [Validators.required, Validators.min(1)]],
      stats: this.fb.group({
        strength: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
        dexterity: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
        constitution: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
        intelligence: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
        wisdom: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
        charisma: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
      }),
      proficiencies: this.fb.array([]),
      inventory: this.fb.array([]),
      spells: this.fb.array([]),
      backstory: ['']
    });
  }

  // Helper to access FormArray
  get proficiencies() {
    return this.characterForm.get('proficiencies') as FormArray;
  }

  get inventory() {
    return this.characterForm.get('inventory') as FormArray;
  }

  get spells() {
    return this.characterForm.get('spells') as FormArray;
  }

  // Method to set FormArray values
  addItem(array: FormArray, value: string = '') {
    array.push(this.fb.control(value));
  }

  // Method to remove item from FormArray
  removeItem(array: FormArray, index: number) {
    array.removeAt(index);
  }

  // Method to handle form submission
  onSubmit() {
    if (this.characterForm.valid) {
      const characterData = this.characterForm.value;

      // Add the character data to the database using the CharacterService
      this.characterService.addCharacter(characterData).subscribe(
          (response) => {
              console.log('Character created successfully!', response);
              this.router.navigate(['/character']).then(() => {
                  window.location.reload();
              });
          },
          (error) => {
              console.error('Error creating character', error);
          }
      );
  }
  }
}
