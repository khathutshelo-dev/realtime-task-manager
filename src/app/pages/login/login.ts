import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
  // TEMP LOGIN BYPASS (NO BACKEND)
  localStorage.setItem("token", "demo-token");

  this.router.navigate(['/dashboard']);
}

  goRegister() {
    this.router.navigate(['/register']);
  }
}
