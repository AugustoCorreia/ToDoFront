import { Component, OnInit } from '@angular/core';
import { Tasks } from '../models/tasks';
import { TasksService } from '../services/tasks.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  task = {} as Tasks;
  taskList:any=[];

  constructor(public taskservice:TasksService) {}

  async ngOnInit(){
    await this.getAllTasks();
  }

  async getAllTasks(){
    await this.taskservice.getTasks().subscribe((tasks: Tasks[]) => {this.taskList = tasks;});
  }


  
  

}
