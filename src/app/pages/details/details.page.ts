import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Used to access route parameters
import { WeatherService } from '../../services/weather.service'; // Custom service to fetch weather data
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true, // Enables Angular Standalone Component mode
  imports: [IonicModule, CommonModule, RouterModule], // Required modules for this page
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  city: string = ''; // City name extracted from the route
  weatherData: any = null; // Stores weather data response
  loading = true; // Controls loading spinner visibility
  error = ''; // Holds error message if API call fails
  unit: 'C' | 'F' = 'C'; // Temperature unit, default is Celsius

  constructor(
    private route: ActivatedRoute, // For reading route parameters
    private weatherService: WeatherService // Injected weather service to make API call
  ) {}

  ngOnInit() {
    // Reads the temperature unit
    const saved = localStorage.getItem('unit');
    if (saved === 'F' || saved === 'C') {
      this.unit = saved;
    }

    // Takes the city parameter
    this.city = this.route.snapshot.paramMap.get('city') || '';

    // If city exists, call the weather API
    if (this.city) {
      this.weatherService.getWeather(this.city).subscribe({

        next: (data) => {
          this.weatherData = data;
          this.loading = false;
        },
        // Handle API error in case theres a problem with the key
        error: (err) => {
          console.error('Weather API error:', err);
          this.error = 'Could not load weather details.';
          this.loading = false;
        },
      });
    }
  }
}


