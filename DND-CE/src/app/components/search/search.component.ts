import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonToolbar, IonHeader, IonTitle, IonContent, IonItem, IonInput, IonButton, IonList, IonLabel, IonSpinner, IonSelectOption, IonSelect } from "@ionic/angular/standalone";
import { Open5eService } from '../../services/open5e.service';


@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, IonSpinner, IonLabel, IonList, IonButton, IonInput, IonItem, IonContent, IonTitle, IonHeader, IonToolbar, IonSelectOption, IonSelect],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  query: string = '';
  results: any[] = [];
  loading = false;
  category: string = 'spells'; // default

  constructor(private open5e: Open5eService) {}

  onSearch() {
    if (!this.category) return;
  
    this.loading = true;
    this.open5e.search(this.category as any, this.query).subscribe(response => {
      this.results = response.results;
      this.loading = false;
    });
  }

}
