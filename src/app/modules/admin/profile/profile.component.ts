import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayEditProfile = false;

  constructor(private location: Location) { }

  // Edit profile popup 
  displayProfile(){
    this.displayEditProfile = true;
  }

  toggleDisplayEditProfile(v){
    this.displayEditProfile = v ;
  }


  ngOnInit(): void {
  }

  // back function
  goBack() {
    this.location.back();
  }
}
