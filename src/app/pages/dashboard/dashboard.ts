import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Task {
  text: string;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  newTask: string = '';
  tasks: Task[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  }

  addTask(): void {
    if (!this.newTask.trim()) return;

    const task: Task = {
      text: this.newTask,
      date: new Date().toLocaleString()
    };

    this.tasks.push(task);
    this.saveTasks();

    this.newTask = '';
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
