import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-test',
  templateUrl: './add-new-test.component.html',
  styleUrls: ['./add-new-test.component.scss']
})
export class AddNewTestComponent implements OnInit {
  
  @Output() onToggleTest = new EventEmitter<boolean>();
  onToggle(test: boolean){
   this.onToggleTest.emit(test);
 }

  constructor() { }

  ngOnInit(): void {
  }

}
