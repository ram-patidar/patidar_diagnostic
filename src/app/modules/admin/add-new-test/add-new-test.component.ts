import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestServiceService } from 'src/app/services/test-service.service';

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

  constructor(private fb:FormBuilder, private testservice:TestServiceService) {
    this.addTestForm = this.fb.group({
      name:['',Validators.required],
      test_price:['',Validators.required],
      contact:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  addTest(){
    this.testservice.addTest(this.addTestForm.value).subscribe(data => {
      this.data = data;
    })
  }
}
