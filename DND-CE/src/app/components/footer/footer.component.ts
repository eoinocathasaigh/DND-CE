import { Component } from '@angular/core';
import { IonFooter, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-footer',
  imports: [IonTitle, IonToolbar, IonFooter, ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
