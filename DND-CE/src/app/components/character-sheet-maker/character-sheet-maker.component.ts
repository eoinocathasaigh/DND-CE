import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule  } from '@angular/forms';
import { IonButton, IonTextarea, IonLabel, IonItem, IonListHeader, IonInput, IonContent } from "@ionic/angular/standalone";
import { CharacterService } from '../../services/character.service'; 

@Component({
  selector: 'app-character-create',
  templateUrl: './character-sheet-maker.component.html',
  imports: [CommonModule, ReactiveFormsModule, IonContent, IonInput, IonListHeader, IonItem, IonListHeader, IonInput, IonTextarea, IonButton, IonButton, IonContent, IonItem, IonLabel],

  styleUrls: ['./character-sheet-maker.component.css'],
})
export class CharacterSheetMakerComponent {
  characterForm: FormGroup;

  constructor(private fb: FormBuilder, private characterService: CharacterService) {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      race: ['', Validators.required],
      class: ['', Validators.required],
      level: [1, [Validators.required, Validators.min(1)]],
      alignment: ['', Validators.required],
      stats: this.fb.group({
        strength: [10, [Validators.required]],
        dexterity: [10, [Validators.required]],
        constitution: [10, [Validators.required]],
        intelligence: [10, [Validators.required]],
        wisdom: [10, [Validators.required]],
        charisma: [10, [Validators.required]],
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

  addItem(array: FormArray, value: string = '') {
    array.push(this.fb.control(value));
  }

  removeItem(array: FormArray, index: number) {
    array.removeAt(index);
  }

  onSubmit() {
    if (this.characterForm.valid) {
      const characterData = this.characterForm.value;

      this.characterService.getCharacter(characterData).subscribe(
        (response) => {
          console.log('Character created successfully!', response);
          // Maybe show a success message or reset the form here
        },
        (error) => {
          console.error('Error creating character', error);
          // Handle errors here
        }
      );
    }
  }
}
