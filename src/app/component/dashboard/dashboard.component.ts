import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormGroup, FormBuilder, FormControl,FormsModule} from '@angular/forms'
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  empDetail !: FormGroup;
  empObj : Employee = new Employee();
  empList : Employee[] = [];
  empId: any[]=[];
  exId: any[]=[];
  del: any[]=[];

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.empDetail = this.formBuilder.group({
      id : [''],
      name : [''],
      age: [''],
      gender: ['']
    });    
  }



  addEmployee(){
    var newId=this.empDetail.value.id;
    var employ=this.empDetail.value;
    if (this.empId.includes(newId)) {
      alert("This Employee Code is already existed in Database!");
    }
    else if(employ.id>=1 && employ.name.length>=1 && employ.age>=21 && employ.age<=99 && employ.gender!=""){
        this.empId.push(this.empDetail.value.id);
        this.empList.push(this.empDetail.value);
        this.empDetail.reset();
      }
      else if(employ.id>=1 && employ.name.length=="" && employ.age>=21 && employ.age<=99 && employ.gender!=""){
        alert("Employee Name is not entered!");
        noChange();
      }
      else if(employ.id>=1 && employ.name.length>=1 && employ.age>="" && employ.gender!=""){
        alert("Employee Age is not entered!");
        noChange();
      }
      else if(employ.id>=1 && employ.name.length>=1 && employ.age>=21 && employ.age<=99 && employ.gender==""){
        alert("Employee Gender is not selected!");
        noChange();
      }
      else{
        alert("Data Insuffienct!");
        noChange();
      }
    }

  editEmployee(emp : Employee) {    

    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['name'].setValue(emp.name);
    this.empDetail.controls['age'].setValue(emp.age);
    this.empDetail.controls['gender'].setValue(emp.gender);
    const i=this.empId.indexOf(this.empDetail.value.id);
    this.exId.push(this.empDetail.value.id);
    this.del.push(i);
  }

  updateEmployee() {

    if (this.empId.includes(this.empDetail.value.id)){
      alert("This Employee Code is already existed in Database!") 
    }else{
      this.empList.splice(this.del[0],1,this.empDetail.value);
      this.empId.splice(this.del[0],1,this.empDetail.value.id);
      this.empId.push(this.exId[0]);
      this.del.pop();
      this.exId.pop();
      this.noChange();

    }

}
    
  noChange(){
   this.empDetail.reset();
  }

  deleteEmployee(emp : Employee) {
    const i=this.empList.indexOf(emp);
    this.empList.splice(i,1);
}
}
