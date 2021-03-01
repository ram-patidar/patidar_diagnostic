import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {


  constructor(private http:HttpClient) { }

  PatientApi = 'http://nextige.com/patidarlab/api/patients?APP_KEY=ABCDEFGHJK';
  EditPatient = 'http://nextige.com/patidarlab/api/patients/id?APP_KEY=ABCDEFGHJK';

  getPatient(){
    return this.http.get(this.PatientApi);
  }

  addPatient(pdata:any){
    return this.http.post(this.PatientApi, pdata);
  }

  updatePatient(pdata:any){
    return this.http.put(this.EditPatient, pdata);
  }
 

}
