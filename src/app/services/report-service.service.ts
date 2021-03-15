import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http:HttpClient) { }
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

}
