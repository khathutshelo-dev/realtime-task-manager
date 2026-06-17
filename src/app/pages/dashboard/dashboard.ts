import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  // ✅ PROPER VARIABLES
  newTask: string = '';
  tasks: string[] = [];

  userEmail: string = 'User';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  // ✅ ADD TASK FUNCTION
  addTask(): void {
    if (this.newTask && this.newTask.trim().length > 0) {
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
    }
  }

  // ✅ LOGOUT FUNCTION
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
