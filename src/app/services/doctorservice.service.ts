import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorserviceService {
  appKey = 'ABCDEFGHJK';
  docMainapi = 'http://nextige.com/patidarlab/api/doctors/';
  doctorApi = 'http://nextige.com/patidarlab/api/doctors?APP_KEY=' + this.appKey;

  constructor(private http: HttpClient) { }

  getDoctor() {
    return this.http.get(this.doctorApi);
  }
  addDoctor(data: any) {
    return this.http.post(this.doctorApi, data);
  }

  updateDoctor(id: any, data: any) {
    return this.http.put(this.docMainapi + id + '?APP_KEY=' + this.appKey, data);
  }

  deleteDoctor(id: any) {
    return this.http.delete(this.docMainapi + id + '?APP_KEY=' + this.appKey);
  }

}
