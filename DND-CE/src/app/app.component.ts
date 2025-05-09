import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { IonApp, IonRouterOutlet, IonHeader, IonContent, IonToolbar, IonTitle, IonButtons, IonFooter, IonMenuButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, IonFooter, IonButtons, IonTitle, IonToolbar, IonContent, IonHeader, IonRouterOutlet, IonApp, NavbarComponent, FooterComponent, IonMenuButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DND-CE';
  constructor(private notificationService: NotificationService) {
    // Request notification permission on app initialization
    this.notificationService.requestPermission();
  }
}
