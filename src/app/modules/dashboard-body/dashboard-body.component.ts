import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.scss']
})
export class DashboardBodyComponent implements OnInit {

  name:any;
  constructor(private authService:AuthserviceService) { }

  ngOnInit(): void {
    this.getUser();
  }
getUser(){
  this.name = localStorage.getItem('name');

}
}
