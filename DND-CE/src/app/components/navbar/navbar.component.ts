import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offcanvas } from 'bootstrap';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  closeMenu(): void {
    const offcanvas = document.getElementById('offcanvasSidebar');
    if (offcanvas) {
      const bsOffcanvas = Offcanvas.getInstance(offcanvas) || new Offcanvas(offcanvas);
      bsOffcanvas.hide();
    }
  }
}
