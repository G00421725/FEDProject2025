import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  city: string = '';
  weatherData: any = null;
  loading = false;
  error = '';
  unit: 'C' | 'F' = 'C';

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit() {
    const saved = localStorage.getItem('unit');
    if (saved === 'F' || saved === 'C') {
      this.unit = saved;
    }
  }

  searchWeather() {
    if (!this.city) return;

    this.loading = true;
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
        this.error = '';
      },
      error: (err) => {
        console.error('API error:', err);
        this.error = err.error?.message || 'City not found';
        this.weatherData = null;
        this.loading = false;
      }
    });
  }

  goToDetails() {
    if (this.city) {
      this.router.navigate(['/details', this.city]);
    }
  }
}


