import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http:HttpClient) { }
reportApi = 'http://nextige.com/patidarlab/api/reports?APP_KEY=ABCDEFGHJK';


addReport(data:any){
  return this.http.post(this.reportApi,data);
}

getReport(){
  return this.http.get(this.reportApi);
}

}
