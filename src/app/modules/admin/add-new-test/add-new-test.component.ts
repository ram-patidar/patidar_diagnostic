import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestServiceService } from 'src/app/services/test-service.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-add-new-test',
  templateUrl: './add-new-test.component.html',
  styleUrls: ['./add-new-test.component.scss']
})
export class AddNewTestComponent implements OnInit {
  data: any;
  parameterAllData = [];
  testData: any;

  @Output() onToggleTest = new EventEmitter<boolean>();
  onToggle(test: boolean) {
    this.onToggleTest.emit(test);
  }

  addTestForm: FormGroup;
  parametereData: FormGroup;

  constructor(private fb: FormBuilder, private testService: TestServiceService, private _toastService: ToastService) {
    this.addTestForm = this.fb.group({
      test_name: ['', Validators.required],
      price: ['', Validators.required],
      parameter_name: [''],
      unit: [''],
      interval: ['']
    })
  }

  ngOnInit(): void {
  }

  addTest() {
    this.testService.addTest(this.addTestForm.value).subscribe(data => {
      this.testData = data;
      console.log(data);

      if (this.testData.success == 1) {
        this.parameterAllData.forEach(obj => {
          obj.test_id = this.testData.id;
        });

        this.parameterAllData.forEach(obj => {
          this.testService.addParameter(obj).subscribe(data => {
            console.log(data);
          });
        });

        this._toastService.success('Test added sucessfully!!');
        this.addTestForm.reset();
      }
    });

  }

  addParameter() {
    this.parameterAllData.push({ 'parameter_name': this.addTestForm.value.parameter_name, 'unit': this.addTestForm.value.unit, 'min_range': this.addTestForm.value.interval});
    this.addTestForm.controls['parameter_name'].reset();
    this.addTestForm.controls['unit'].reset();
    this.addTestForm.controls['interval'].reset();
    
    console.log(this.parameterAllData);
  }

  removeParameter(i) {
    this.parameterAllData.splice(i, 1);
  }
}
