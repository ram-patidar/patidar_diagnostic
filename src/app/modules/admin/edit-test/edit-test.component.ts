import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TestServiceService } from 'src/app/services/test-service.service';
import { ToastService } from 'angular-toastify';


@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent implements OnInit {
  parameterAllData = [];
  editTestid:any;
  deleteId = [];
  @Output() onToggleTest = new EventEmitter<boolean>();
  @Output() updatedTest = new EventEmitter<boolean>();
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  onToggle(test: boolean){
   this.onToggleTest.emit(test);
 }
 editTestForm:FormGroup;
  constructor(private fb:FormBuilder, private testService:TestServiceService, private ToastService:ToastService) { 

this.editTestForm = this.fb.group({
  test_name:['', Validators.required],
  price:['', Validators.required],
  parameter_name:['', Validators.required],
  unit:['', Validators.required],
  min:['', Validators.required],
  max:['', Validators.required]
});

  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((row) => this.editTest(row));
  }

  updateTest(){
this.testService.updateTest(this.editTestid,this.editTestForm.value).subscribe(data => {
  console.log(this.deleteId);
  this.deleteId.forEach(id => {
    console.log(id);
   this.testService.deleteParameter(id).subscribe( data => {
     console.log(data);
     this.deleteId = [];
   }) 
  });
  if(this.parameterAllData.length != 0){
  this.parameterAllData.forEach(obj => {
    if(obj.id != ''){
this.testService.updateParameter(obj.id,obj).subscribe(data => {
  console.log(data);
});
    }else{
      this.testService.addParameter(obj).subscribe( data => {
        console.log(data);
      })
    }
    this.updatedTest.emit();

  });

}
this.onToggleTest.emit(false);
this.ToastService.success('Test updated successfully!!');


})

  }

  addParameter(){
    this.parameterAllData.push({'id':'','parameter_name':this.editTestForm.value.parameter_name, 'unit':this.editTestForm.value.unit, 'min_range':this.editTestForm.value.min, 'max_range':this.editTestForm.value.max, 'test_id':this.editTestid});
    this.editTestForm.controls['parameter_name'].reset();
    this.editTestForm.controls['unit'].reset();
    this.editTestForm.controls['min'].reset();
    this.editTestForm.controls['max'].reset();
    console.log(this.parameterAllData);
  }

  removeParameter(i,data){
    this.parameterAllData.splice(i,1);
    this.deleteId.push(data.id);
 
  //  console.log(this.deleteId);
  }

  editTest(row){
    this.deleteId = [];
    this.editTestid =  row.id;
    this.editTestForm = this.fb.group({
      test_name:[row.test_name, Validators.required],
      price:[row.price, Validators.required],
      parameter_name:['', Validators.required],
      unit:['', Validators.required],
      min:['', Validators.required],
      max:['', Validators.required]
    });
    this.parameterAllData = row.paradata;


  }

}
