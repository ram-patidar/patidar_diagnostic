import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { ReportServiceService } from 'src/app/services/report-service.service';


@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.scss']
})
export class DashboardBodyComponent implements OnInit {

todayDate = new Date();
totaltest = 0;
testCompleted = 0;
repoData:any;
  name:any;
  constructor(private authService:AuthserviceService, private datePipe:DatePipe, private repo:ReportServiceService) { }

  ngOnInit(): void {
    this.getUser();
  }
getUser(){
  this.totaltest = 0;
  this.name = localStorage.getItem('name');
console.log(this.datePipe.transform(this.todayDate, 'd MMM, y'));
this.repo.getReport().subscribe( data=> {
this.repoData = data;
console.log(this.repoData);
let repoSelectedData = [];
this.repoData.forEach((element,i) => {
  if(this.datePipe.transform(this.repoData[i].created_at, 'd MMM, y') == this.datePipe.transform(this.todayDate, 'd MMM, y')){
    repoSelectedData.push(this.repoData[i]);
  }
});


repoSelectedData.forEach(element => {
  let testIds = [];
  let uniquetest = [];
this.totaltest = this.totaltest + JSON.parse(element.test).length;
if(element.authorised != null){
  let pdata = JSON.parse(element.authorised);
  pdata.forEach(para => {
    if(para.auth != false){
      testIds.push(para.tid);
    }
  });
}
testIds.forEach(element => {
  if(uniquetest.includes(element) != true) uniquetest.push(element);
});
this.testCompleted = this.testCompleted+uniquetest.length;
});




});
}
}
