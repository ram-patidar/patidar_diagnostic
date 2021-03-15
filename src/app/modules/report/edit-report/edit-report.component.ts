import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { ReportServiceService } from 'src/app/services/report-service.service';
import { TestServiceService } from 'src/app/services/test-service.service';


@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {
  repoid:any;
  
  finalAlldata = [];
allparameter=[];
patientData:any;
nameShort:any;

testForm:FormGroup;

 
  constructor(private route: ActivatedRoute, private reposervice:ReportServiceService, private patService:PatientServiceService, private testService:TestServiceService, private fb:FormBuilder) { 
    this.route.params.subscribe(
      params => {
      this.repoid = params.id;
      }
    )
  
 
  }

  ngOnInit(): void {
this.getRepoData();




  }
  testSubmit(){
    let allData = [];
    // console.log(this.testForm.value);
    for (const property in this.testForm.value) {
  
      if(property != 'authorised' && property != 'report_id'){
        if(property.split(',').length != 0){
          let pa = property.split(',');
          let tid = pa[0];
          let pid = pa[1]


          let pvalue = this.testForm.value[property];
        
          let a = {testId: tid, pid:pid, value:pvalue}
          allData.push(a);
         
        }
   
      // console.log(`${property}: ${this.testForm.value[property]}`);
      }
    }
    console.log(allData);
  }

  getRepoData(){
    this.allparameter = [];
    this.reposervice.getReportbyId(this.repoid).subscribe( data => {
      let repoData = data;
this.patService.getPatientbyid(repoData[0].patients_id).subscribe((data)=>{
this.patientData = data;
if(this.patientData[0].first_name.split(" ").length > 1){
this.nameShort = this.patientData[0].first_name.split(" ")[0][0]+this.patientData[0].first_name.split(" ")[1][0];
}else{
  this.nameShort = this.patientData[0].first_name[0];
}
})
      let stest = JSON.parse(repoData[0].test);
      let alltestData;
      let selectedtest = [];
      this.testService.getTest().subscribe( data => {
     alltestData = data;

     alltestData.forEach(atest => {
      stest.forEach(stestl => {
        if(atest.id == stestl.id){
          selectedtest.push(atest);
          
        }
      });
     });

  let paramenter;
this.reposervice.getParameter().subscribe( data => {
  paramenter = data;
  let parainnerdata = [];

  selectedtest.forEach(stest => {
   
    paramenter.forEach(para => {
  
      if(stest.id == para.test_id){
      parainnerdata.push(para);
    this.allparameter.push(para);
    }
  
    });  
    this.finalAlldata.push({'name':stest.test_name, 'id':stest.id, 'para':parainnerdata});
    parainnerdata = [];

  });

 
  this.createGroup();
 

})




      })






    })
  }

  createGroup(){
    let group={};
    group['authorised'] = new FormControl(false);    
    group['report_id'] = new FormControl(this.repoid);
    this.allparameter.forEach(input_template=>{
      group[input_template.test_id+','+input_template.id]=new FormControl('');  
    });
    
    this.testForm = new FormGroup(group);
  }

 
}
