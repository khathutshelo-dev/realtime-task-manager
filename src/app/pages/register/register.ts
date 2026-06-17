import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
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
    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.auth.register(data).subscribe({
      next: (res: any) => {
        this.message = "Account created successfully ✔";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.message = err.error.message || "Registration failed";
      }
    });
  }
}
