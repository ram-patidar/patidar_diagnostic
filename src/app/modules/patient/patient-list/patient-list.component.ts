import { Component,ViewChild, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { PatientServiceService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})

export class PatientListComponent implements OnInit {
  public dataall:any;
  
  @ViewChild('search', { static: false }) search: any;

  
  public temp:any;
  public selected = [];
  public testdata = [];
  public editData:any;
  // rows = [
  //   { name: 'Austin', gender: 'Male', company: 'Swimlane' },
  //   { name: 'Dany', gender: 'Male', company: 'KFC' },
  //   { name: 'Molly', gender: 'Female', company: 'Burger King' }
  // ];
  public count = 100;
  public pageSize = 3;
  public limit = 3;
  public offset = 0;
  public rowdata = [];
  columns = [ { name:'Prefix' ,prop: 'prefix',width:100 },{ name:'fName' ,prop: 'first_name',width:100 },  { name:'LName' ,prop: 'last_name',width:100 }, { name: 'Gender/age',prop: 'gender', width:100  },{ name: 'age',prop: 'age', width:100  }, { name: 'Registered On',prop: 'created_at', width:100  },{ name: 'Patient Id',prop: 'id', width:100  }, { name: 'Contact No',prop: 'contact', width:100  }];
  displayAddPatient = false;
  displayEditPatient = false;
  displayBillingPatient = false;
  data:any;

  DisplayPatient(){
    this.displayAddPatient = true;
  }

  toggleDisplayAddPatient(v:boolean){
    this.displayAddPatient = v ;
   
    console.log(v);
  }
 
 
  

  constructor(private patService:PatientServiceService) {}

  ngOnInit(): void {
   
    
    this.get_data();
  }

 


onActivate(event:any) {
  //console.log('Activate Event', event);
}

public changeLimit(event:any): void {
  this.limit = parseInt(event.target.value);

}

public onPage(event:any): void {

  this.count = event.count;
  this.pageSize = event.pageSize;
  this.limit = event.limit;
  this.offset = event.offset;
}



ngAfterViewInit(): void {
  // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  // Add 'implements AfterViewInit' to the class.
 
  fromEvent(this.search.nativeElement, 'keydown').pipe(
    debounceTime(100),
    map(x => x['target']['value'])
  ).subscribe(value => {
      this.updateFilter(value);
    });
}

updateFilter(val: any) {
  const value = val.toString().toLowerCase().trim();
  // get the amount of columns in the table
  const count = this.columns.length;
  // get the key names of each column in the dataset
  const keys = Object.keys(this.temp[0]);
  // assign filtered matches to the active datatable

  this.dataall = this.temp.filter(item => {
    // iterate through each row's column data
    for (let i = 0; i < count; i++) {
      // check for a match
      if (
        (item[keys[i]] &&
          item[keys[i]]
            .toString()
            .toLowerCase()
            .indexOf(value) !== -1) ||
        !value
      ) {
        // found match, return true to add to result set
        return true;
      }
    }
  });

  // Whenever the filter changes, always go back to the first page
  // this.table.offset = 0;
}


onSelect({ selected }) {


  this.selected.splice(0, this.selected.length);
  this.selected.push(...selected);
}

get_data(){
 

  this.patService.getPatient().subscribe(data => {
    this.temp = data;
    this.dataall = [...this.temp];
    console.log(data);
  });
    
 
}

editPatient(row:any){
  console.log(row);
  this.displayEditPatient = true;
  this.editData = row;
}



toggleeditPatient(e:boolean){
  this.displayEditPatient = e;
}


}
