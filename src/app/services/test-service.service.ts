import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
  appKey = 'ABCDEFGHJK';
 testMainapi = 'http://nextige.com/patidarlab/api/tests/';
  testApi = 'http://nextige.com/patidarlab/api/tests?APP_KEY='+this.appKey;

  constructor(private http:HttpClient) { }

  getTest(){
    return this.http.get(this.testApi);
  }
  addTest(data:any){
    return this.http.post(this.testApi,data);
  }
  
  updateTest(id:any,data:any){
    return this.http.put(this.testMainapi+id+'?APP_KEY='+this.appKey,data);
  }
  
  deleteTest(id:any){
    return this.http.delete(this.testMainapi+id+'?APP_KEY='+this.appKey);
    
  }
}
