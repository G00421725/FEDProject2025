import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

const API_KEY = '7f683d26a30d4aeeb43235928252404';
const BASE_URL = 'https://api.weatherapi.com/v1';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  getWeather(city: string): Observable<any> {
    return this.http.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`);
  }

  getWeatherByCoords(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
    );
  }
}
