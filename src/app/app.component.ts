import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component'; // Adjust path if needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule, MenuComponent],
  template: `
    <ion-app>
      <app-menu></app-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-app>
  `,
})
export class AppComponent {}


