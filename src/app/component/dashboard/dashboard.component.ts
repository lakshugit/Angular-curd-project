import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Model/task';
import { CurdService } from 'src/app/service/curd.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  taskObj: Task = new Task();
  taskArr: Task[] = [];
  task!: Task[];
  addTaskValue: string = '';
  editTaskValue : string ='';
 
  
  constructor(private curdService : CurdService){}
  ngOnInit(): void {
    this.editTaskValue ='';
    this.addTaskValue ='';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
   
    
   
  } 
  getAllTask() {
   this.curdService.getAllTask().subscribe(res => {
    this.taskArr = res;
   },error => {
    alert("Unable to get list os task")
   });
  }
  addTask(){
    
    this.taskObj.task_name = this.addTaskValue;
    this.curdService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
     
    },error =>{
      alert(error);
    })
  }
  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.curdService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();

    },error=>{
      alert("Failed toi update task");
    })
  }
  deleteTask(itask : Task){
    this.curdService.deleteTask(itask).subscribe(res => {
      this.ngOnInit();

    },error =>{
      alert("Failed to delete task");
    }
    
    )
  }
  call(itask : Task){
    this.taskObj = itask;
    this.editTaskValue = itask.task_name;

  }
  

}
