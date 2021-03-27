import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-print-report',
  templateUrl: './print-report.component.html',
  styleUrls: ['./print-report.component.scss']
})
export class PrintReportComponent implements OnInit {
  state$:any; 
  PatData:any;
  finalData = [];
  todayDate = new Date();

  constructor(private route: Router, private router:ActivatedRoute) { }

  ngOnInit(): void {
    if(window.history.state.patientData != null){
    this.PatData = JSON.parse(window.history.state.patientData)[0];
    }
    if(window.history.state.finalData != null){
    this.finalData = JSON.parse(window.history.state.finalData);
    console.log(this.PatData);
    }
    // this.state$ = this.router.paramMap
    // .pipe(map(() => window.history.state))

   
   
  }

  print(){
   
    window.print();
  }

  

}
