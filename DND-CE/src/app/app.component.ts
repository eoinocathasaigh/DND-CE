import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { IonApp, IonRouterOutlet, IonHeader, IonContent, IonSplitPane, IonMenu, IonToolbar, IonTitle, IonButtons, IonFooter, IonMenuButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, IonFooter, IonButtons, IonTitle, IonToolbar, IonContent, IonHeader, IonRouterOutlet, IonApp, NavbarComponent, FooterComponent, IonMenuButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DND-CE';
}
