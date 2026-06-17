import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Task {
  text: string;
  priority: string;
  createdAt: string;
  dueDate: string;
  dueTime: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  // INPUT FIELDS
  newTask: string = '';
  selectedPriority: string = 'Medium';
  selectedDate: string = '';
  selectedTime: string = '';

  // DATA STORAGE
  tasks: Task[] = [];
  deletedTasks: Task[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {

    // AUTH CHECK
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    // LOAD ACTIVE TASKS
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }

    // LOAD BIN TASKS
    const savedDeleted = localStorage.getItem('deletedTasks');
    if (savedDeleted) {
      this.deletedTasks = JSON.parse(savedDeleted);
    }
  }

  // ADD TASK WITH DATE + TIME + PRIORITY
  addTask(): void {

    if (!this.newTask.trim()) return;

    const task: Task = {
      text: this.newTask,
      priority: this.selectedPriority,
      createdAt: new Date().toLocaleString(),
      dueDate: this.selectedDate,
      dueTime: this.selectedTime
    };

    this.tasks.unshift(task);

    this.newTask = '';
    this.selectedPriority = 'Medium';
    this.selectedDate = '';
    this.selectedTime = '';

    this.saveData();
  }

  // DELETE TO BIN
  deleteTask(index: number): void {
    this.deletedTasks.unshift(this.tasks[index]);
    this.tasks.splice(index, 1);
    this.saveData();
  }

  // RESTORE FROM BIN
  restoreTask(index: number): void {
    this.tasks.unshift(this.deletedTasks[index]);
    this.deletedTasks.splice(index, 1);
    this.saveData();
  }

  // EMPTY BIN
  emptyBin(): void {
    this.deletedTasks = [];
    this.saveData();
  }

  // SAVE TO LOCAL STORAGE
  saveData(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('deletedTasks', JSON.stringify(this.deletedTasks));
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // STATS
  get totalTasks(): number {
    return this.tasks.length;
  }

  get highPriority(): number {
    return this.tasks.filter(t => t.priority === 'High').length;
  }

  get mediumPriority(): number {
    return this.tasks.filter(t => t.priority === 'Medium').length;
  }

  get lowPriority(): number {
    return this.tasks.filter(t => t.priority === 'Low').length;
  }
}
