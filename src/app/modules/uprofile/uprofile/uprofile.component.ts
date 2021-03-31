import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'app-uprofile',
  templateUrl: './uprofile.component.html',
  styleUrls: ['./uprofile.component.scss']
})
export class UprofileComponent implements OnInit {

  constructor(private reportService:ReportServiceService, private router:ActivatedRoute) { }
pid:any;

  ngOnInit(): void {

    this.router.params.subscribe( data=> {
  this.pid = data.id;
    })
    let allReport:any;
this.reportService.getReport().subscribe(data => {
allReport = data;
});


  }

}
