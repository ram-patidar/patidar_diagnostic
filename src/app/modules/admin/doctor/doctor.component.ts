import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  displayEditDoctor = false;
  displayAddDoctor = false;
  
  constructor() { }

   // Edit doctor popup
  displayDoctor(){
    this.displayEditDoctor = true;
  }

  toggleDisplayEditDoctor(v){
    this.displayEditDoctor = v ;
  }

  // Add doctor popup
  displayAdDoctor(){
    this.displayAddDoctor = true;
  }

  toggleDisplayAddDoctor(v){
    this.displayAddDoctor = v ;
  }

  ngOnInit(): void {
  }

}
