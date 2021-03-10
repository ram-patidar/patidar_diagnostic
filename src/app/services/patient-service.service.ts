import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  constructor(private http: HttpClient) { }
  appKey = 'ABCDEFGHJK';
  PatientmainApi = 'http://nextige.com/patidarlab/api/patients?APP_KEY=';
  PatientApi = 'http://nextige.com/patidarlab/api/patients/';

  getPatient() {
    return this.http.get(this.PatientmainApi + this.appKey);
  }

  addPatient(pdata: any) {
    return this.http.post(this.PatientmainApi + this.appKey, pdata);
  }

  updatePatient(id: any, pdata: any) {
    return this.http.put(this.PatientApi + id + '?APP_KEY=' + this.appKey, pdata);
  }

  deletePatient(id: any) {
    return this.http.delete(this.PatientApi + id + '?APP_KEY=' + this.appKey);
  }

}
