import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  message = ''; // ✅ FIX HERE

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.message = 'Account created successfully ✔';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err) => {
        this.message = err.error.message || 'Registration failed';
      }
    });
  }
}
