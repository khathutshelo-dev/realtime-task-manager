import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Task {
  text: string;
  priority: string;
  createdAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class DashboardComponent implements OnInit {

  newTask = '';

  selectedPriority = 'Medium';

  tasks: Task[] = [];

  deletedTasks: Task[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }

    const savedDeleted = localStorage.getItem('deletedTasks');

    if (savedDeleted) {
      this.deletedTasks = JSON.parse(savedDeleted);
    }

  }

  addTask(): void {

    if (!this.newTask.trim()) {
      return;
    }

    this.tasks.unshift({

      text: this.newTask,

      priority: this.selectedPriority,

      createdAt: new Date().toLocaleString()

    });

    this.newTask = '';

    this.selectedPriority = 'Medium';

    this.saveData();

  }

  deleteTask(index: number): void {

    this.deletedTasks.unshift(this.tasks[index]);

    this.tasks.splice(index, 1);

    this.saveData();

  }

  restoreTask(index: number): void {

    this.tasks.unshift(this.deletedTasks[index]);

    this.deletedTasks.splice(index, 1);

    this.saveData();

  }

  emptyBin(): void {

    this.deletedTasks = [];

    this.saveData();

  }

  saveData(): void {

    localStorage.setItem(
      'tasks',
      JSON.stringify(this.tasks)
    );

    localStorage.setItem(
      'deletedTasks',
      JSON.stringify(this.deletedTasks)
    );

  }

  logout(): void {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }

  get totalTasks(): number {
    return this.tasks.length;
  }

  get highPriority(): number {
    return this.tasks.filter(
      t => t.priority === 'High'
    ).length;
  }

  get mediumPriority(): number {
    return this.tasks.filter(
      t => t.priority === 'Medium'
    ).length;
  }

  get lowPriority(): number {
    return this.tasks.filter(
      t => t.priority === 'Low'
    ).length;
  }

}
