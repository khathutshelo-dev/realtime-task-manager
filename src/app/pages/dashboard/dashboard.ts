import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  userEmail: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
    }

    this.userEmail = 'User';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
