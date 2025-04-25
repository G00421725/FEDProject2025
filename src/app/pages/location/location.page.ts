import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { WeatherService } from '../../services/weather.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  weatherData: any = null;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeatherFromLocation();
  }

  loadWeatherFromLocation() {
    this.loading = true;
    this.error = '';

    Geolocation.getCurrentPosition()
      .then(position => {
        const { latitude, longitude } = position.coords;
        this.weatherService.getWeatherByCoords(latitude, longitude).subscribe({
          next: (data) => {
            this.weatherData = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Weather API error:', err);
            this.error = 'Could not load weather data.';
            this.loading = false;
          }
        });
      })
      .catch(err => {
        console.error('Geolocation error:', err);
        this.error = 'Could not get your location.';
        this.loading = false;
      });
  }
}
