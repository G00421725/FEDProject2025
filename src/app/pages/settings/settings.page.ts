import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  unit: 'C' | 'F' = 'C';
  darkMode: boolean = false;

  ngOnInit() {
    const savedUnit = localStorage.getItem('unit');
    const savedDark = localStorage.getItem('darkMode');
  
    if (savedUnit === 'F' || savedUnit === 'C') {
      this.unit = savedUnit;
    }
  
    this.darkMode = savedDark === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  saveUnitPreference() {
    localStorage.setItem('unit', this.unit);
  }

  toggleDarkMode(event: any) {
    const enabled = event.detail.checked;
    this.darkMode = enabled;
    localStorage.setItem('darkMode', String(enabled));
    document.body.classList.toggle('dark', enabled);
  }
}



