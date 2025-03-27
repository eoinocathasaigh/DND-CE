import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DND-CE';

  //Constructor to be used for dependenct injection
  constructor(private router: Router) { }

  ngOnInit() {
    //Automatically routing the user to the home page when they boot up the app
    this.router.navigate(['home']);
  }
}
