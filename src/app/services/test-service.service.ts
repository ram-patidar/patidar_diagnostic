import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
  appKey = 'ABCDEFGHJK';
 testMainapi = 'http://nextige.com/patidarlab/api/tests/';
  testApi = 'http://nextige.com/patidarlab/api/tests?APP_KEY='+this.appKey;
  parameterApi = 'http://nextige.com/patidarlab/api/parameter?APP_KEY='+this.appKey;
  parametermainApi = 'http://nextige.com/patidarlab/api/parameter/';

  constructor(private http:HttpClient) { }

  getTest(){
    return this.http.get(this.testApi);
  }
  addTest(data:any){
    return this.http.post(this.testApi,data);
  }

  addParameter(data:any){
    return this.http.post(this.parameterApi,data);
  }
  updateParameter(id:any,data:any){
    return this.http.put(this.parametermainApi+id+'?APP_KEY='+this.appKey,data);
  }
  deleteParameter(id:any){
    return this.http.delete(this.parametermainApi+id+'?APP_KEY='+this.appKey);
  }
  getParameter(){
    return this.http.get(this.parameterApi);
  }
  updateTest(id:any,data:any){
    return this.http.put(this.testMainapi+id+'?APP_KEY='+this.appKey,data);
  }
  
  deleteTest(id:any){
    return this.http.delete(this.testMainapi+id+'?APP_KEY='+this.appKey);
    
  }
}
