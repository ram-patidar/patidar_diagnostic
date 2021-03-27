import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts"; 
import { DatePipe } from '@angular/common';
import { TestServiceService } from './test-service.service';
import { NavigationExtras, Router } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs; 

@Injectable({
  providedIn: 'root'

})
export class ReportServiceService {
  finalData = [];
  todayDate =  new Date();
  constructor(private http:HttpClient, private datepipe:DatePipe, private testservice:TestServiceService, private router:Router) { }
  appKey = '?APP_KEY=ABCDEFGHJK';
reportApi = 'https://nextige.com/patidarlab/api/reports?APP_KEY=ABCDEFGHJK';
reportMainApi = 'https://nextige.com/patidarlab/api/reports/';
parameterApi = 'https://nextige.com/patidarlab/api/parameter?APP_KEY=ABCDEFGHJK';



addReport(data:any){
  return this.http.post(this.reportApi,data);
}
getReportbyId(id:any){
  return this.http.get(this.reportMainApi+id+this.appKey);
}

getReport(){
  return this.http.get(this.reportApi);
}

deleteRepo(id:any){
  return this.http.delete(this.reportMainApi+id+this.appKey);
}
getParameter(){
return this.http.get(this.parameterApi);
}
updateReport(id,data){
  return this.http.put(this.reportMainApi+id+this.appKey,data);
}


generatePDF(repoData,paraData,patientData, testdata, testArr) {
 let testData = testdata;
 this.finalData = [];
  let parafinalData = [];
  let paradata = [];
  if(repoData.parameter_data != null){
paradata = JSON.parse(repoData.parameter_data);

  }
testData.forEach(test => {


  if(testArr.includes(test.id.toString())){
   
    let objData = {tdata:null, paramData:null };
  
    let paraAllfinalDatas = [];
  paraData.forEach(input_template=>{
  
    if(test.id == input_template.test_id){
    if(paradata.length != 0){
    paradata.forEach(para => {
      if(para.pid == input_template.id && para.testId == input_template.test_id && test.id == para.testId){
        if(para.value != ''){
          paraAllfinalDatas.push({paraName:input_template.parameter_name,paraValue:para.value,range:input_template.min_range, paraUnit:input_template.unit});
      }
}

 });
  }
 
}

  });
  if(paraAllfinalDatas.length != 0){
  objData.tdata = test;
  objData.paramData = paraAllfinalDatas;
  this.finalData.push(objData);
  }
}
});


  console.log(this.finalData);  

  const navigationExtras: NavigationExtras = {state: {patientData: JSON.stringify([patientData]), finalData:JSON.stringify(this.finalData) }};
  this.router.navigate(["printreport"], navigationExtras  );
 
}


}
