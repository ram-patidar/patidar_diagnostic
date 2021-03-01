import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  displayEditTest = false;
  displayAddTest = false;

  constructor() { }

  // Edit test popup 
  displayEditTests(){
    this.displayEditTest = true;
  }

  toggleDisplayEditTest(v){
    this.displayEditTest = v ;
  }

  // Add test popup 
  displayAddTests(){
    this.displayAddTest = true;
  }

  toggleDisplayAddTest(v){
    this.displayAddTest = v ;
  }

  ngOnInit(): void {
  }

}
