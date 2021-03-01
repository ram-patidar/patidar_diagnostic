import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-new-doctor',
  templateUrl: './add-new-doctor.component.html',
  styleUrls: ['./add-new-doctor.component.scss']
})
export class AddNewDoctorComponent implements OnInit {

@Output() onToggleDoctor = new EventEmitter<boolean>();
onToggle(doctor: boolean){
 this.onToggleDoctor.emit(doctor);
}

  constructor() { }

  ngOnInit(): void {
  }

}
