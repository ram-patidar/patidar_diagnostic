import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayEditProfile = false;
  udata:any;
  eventsSubject: Subject<void> = new Subject<void>();
  constructor(private location: Location, private authService:AuthserviceService) { }
  // Edit profile popup 
  displayProfile(data:any){
    this.eventsSubject.next(data);
    this.displayEditProfile = true;
  }

  toggleDisplayEditProfile(v){
    this.displayEditProfile = v ;
  }

  ngOnInit(): void {

    this.getUser();
  }

  // back function
  goBack() {
    this.location.back();
  }

  getUser(){
    this.authService.getLoggedInuser(localStorage.getItem('uid')).subscribe( data => {
  this.udata = data;

  
    });
  }
}
