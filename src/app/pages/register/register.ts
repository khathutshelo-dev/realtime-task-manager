import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
  // TEMP REGISTER BYPASS (NO BACKEND)
  localStorage.setItem("token", "demo-token");

  this.router.navigate(['/dashboard']);
}

  goLogin() {
    this.router.navigate(['/login']);
  }
}
