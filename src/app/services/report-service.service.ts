import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts"; 
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs; 

@Injectable({
  providedIn: 'root'

})
export class ReportServiceService {

  todayDate =  new Date();
  constructor(private http:HttpClient, private datepipe:DatePipe) { }
  appKey = '?APP_KEY=ABCDEFGHJK';
reportApi = 'http://nextige.com/patidarlab/api/reports?APP_KEY=ABCDEFGHJK';
reportMainApi = 'http://nextige.com/patidarlab/api/reports/';
parameterApi = 'http://nextige.com/patidarlab/api/parameter?APP_KEY=ABCDEFGHJK';


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


generatePDF(repoData,paraData,patientData) {
  
    
  let parafinalData = [];
  let paradata = [];
  if(repoData.parameter_data != null){
paradata = JSON.parse(repoData.parameter_data);

  }

  paraData.forEach(input_template=>{
 
    if(paradata.length != 0){
    paradata.forEach(element => {
      if(element.pid == input_template.id && element.testId == input_template.test_id){
        if(element.value != ''){
        parafinalData.push({paraname:input_template.parameter_name, paravalue:element.value, paraMax:input_template.max_range, paraMin:input_template.min_range, paraUnit:input_template.unit});
      }
}

 });
  }else{

  }
  });

  let row  = patientData;

  let docDefinition = {
    
    content: [
      {
        columns: [
          [
            {
              text: 'Name: '+row.prefix +" "+ row.first_name
            
            },
            { text: 'Contact:'+row.contact },
            { text: 'Patient id: PDP'+row.id }
            
           
          ],
          [
            {
              text: 'Age/Sex: '+row.age+' Years/'+row.gender,
              alignment: 'right'
            },
            { 
              text: 'Date: '+this.datepipe.transform(this.todayDate, 'd MMM, y'),
              alignment: 'right'
            },
            { 
              text: 'Address: '+row.address,
              alignment: 'right'
            },
          
           
          ]
        ]
      },
      {
        text: 'HEAMATOLOGY REPORT',
        alignment: 'center',
        style: 'sectionHeader'
      },
      
     
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [
            [{text:'Parameter name', bold:true}, {text:'Result', bold:true}, {text:'Normal range', bold:true }  ],
            ...parafinalData.map(p => ([p.paraname, p.paravalue+" "+p.paraUnit, p.paraMin+'-'+p.paraMax])),
           
          ]
 
        }
       
    
      }
     
    ],
    styles: {
      sectionHeader: {
        bold: true,
        decoration: 'underline',
        fontSize: 14,
        margin: [0, 15,0, 15]          
      },
      tableExample: { 
      border:'none !important'
        
      }
    
      
    }
  };


    


    pdfMake.createPdf(docDefinition).print();      
 
}


}
