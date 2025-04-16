import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonTextarea, IonLabel, IonItem, IonListHeader, IonInput, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from "@ionic/angular/standalone";
import { CharacterService } from '../../services/character.service'; 

@Component({
  selector: 'app-character-update',
  templateUrl: './character-update.component.html',
  imports: [ReactiveFormsModule, IonTextarea, IonButton, IonText, IonInput, IonListHeader, IonLabel, IonItem, IonContent, IonTitle, IonBackButton, IonButtons, IonToolbar, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader, IonText, CommonModule, IonContent, IonInput, IonListHeader, IonItem, IonListHeader, IonInput, IonTextarea, IonButton, IonButton, IonContent, IonItem, IonLabel],
  styleUrls: ['./character-update.component.css'],
})

export class CharacterUpdateComponent implements OnInit {
  characterForm: FormGroup;
  character: any;

  // Constructor to initialize the form and inject services
  constructor(private fb: FormBuilder, private characterService: CharacterService, private router: Router, private route: ActivatedRoute) {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      img: [''],
      race: ['', Validators.required],
      class: ['', Validators.required],
      level: [1, [Validators.required, Validators.min(1)]],
      alignment: ['', Validators.required],
      armorClass: [10, [Validators.required, Validators.min(1)]],
      initiative: [0, [Validators.required, Validators.min(-20), Validators.max(20)]],
      speed: [30, [Validators.required, Validators.min(1)]],
      proficiencyBonus: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
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

  // ngOnInit lifecycle hook to fetch character data when the component initializes
  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
  
    if (characterId) {
      this.characterService.getCharacterById(characterId).subscribe(
        (data) => {
          this.character = data; // Set the character data to display in the header
          this.characterForm.patchValue(data); // Populate the form with the character data
  
          // Initialize form arrays if needed
          if (data.proficiencies) {
            this.setFormArray('proficiencies', data.proficiencies);
          }
  
          if (data.inventory) {
            this.setFormArray('inventory', data.inventory);
          }
  
          if (data.spells) {
            this.setFormArray('spells', data.spells);
          }
        },
        (error) => {
          console.error('Error fetching character data:', error);
        }
      );
    }
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

  // Add an item to the FormArray
  addItem(array: FormArray, value: string = '') {
    array.push(this.fb.control(value));
  }

  // Remove an item from the FormArray
  removeItem(array: FormArray, index: number) {
    array.removeAt(index);
  }

  // Set the values for FormArray
  setFormArray(key: string, values: string[]) {
    const control = this.characterForm.get(key) as FormArray;
    control.clear();
    if (values) {
      values.forEach(val => control.push(this.fb.control(val)));
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.characterForm.valid) {
      const updatedCharacterData = this.characterForm.value;
      const characterId = this.route.snapshot.paramMap.get('id');
      if (characterId) {
        this.characterService.updateCharacter(characterId, updatedCharacterData).subscribe(
          (response) => {
            console.log('Character updated successfully!', response);
            this.router.navigate(['/character']);
          },
          (error) => {
            console.error('Error updating character:', error);
          }
        );
      }
    }
  }
}
