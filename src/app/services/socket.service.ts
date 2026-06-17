import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = io('http://localhost:5000');

  joinBoard(boardId: string) {
    this.socket.emit('join-board', boardId);
  }

  onTaskUpdate(callback: any) {
    this.socket.on('task-updated', callback);
  }
}