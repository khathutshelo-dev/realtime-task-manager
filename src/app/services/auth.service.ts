import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ✅ ONE CLEAN BASE URL (always works local + production)
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ========================
  // LOGIN
  // ========================
  login(data: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  // ========================
  // REGISTER
  // ========================
  register(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }
}
