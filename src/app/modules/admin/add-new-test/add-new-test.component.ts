import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-test',
  templateUrl: './add-new-test.component.html',
  styleUrls: ['./add-new-test.component.scss']
})
export class AddNewTestComponent implements OnInit {
  data:any;

  @Output() onToggleTest = new EventEmitter<boolean>();
  onToggle(test: boolean){
   this.onToggleTest.emit(test);
 }

 addTestForm:FormGroup;

  constructor(private fb:FormBuilder) {
    this.addTestForm = this.fb.group({
      name:['',Validators.required],
      test_price:['',Validators.required],
      contact:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  addTest(){
    
  }
}
