import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent implements OnInit {

  @Output() onToggleTest = new EventEmitter<boolean>();
  onToggle(test: boolean){
   this.onToggleTest.emit(test);
 }
 
  constructor() { }

  ngOnInit(): void {
  }

}
