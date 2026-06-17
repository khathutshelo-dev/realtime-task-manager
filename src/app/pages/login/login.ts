import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    console.log("LOGIN CLICKED:", this.email, this.password);

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log("LOGIN SUCCESS:", res);

        localStorage.setItem('token', res.token);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log("LOGIN ERROR:", err);
        alert(err.error?.message || "Login failed");
      }
    });
  }
}