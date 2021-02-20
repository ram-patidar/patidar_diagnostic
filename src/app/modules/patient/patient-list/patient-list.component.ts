import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})

export class PatientListComponent implements OnInit {
  // public data: any;
  // public rows: any;
  // public columns: any;

  isShowDiv = false;
   
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  constructor() {}

  ngOnInit(): void {
     // Initial columns, can be used for data list which is will be filtered
    //  this.columns = [
    //   { prop: 'name' }, 
    //   { prop: 'company', name: 'Company' }, 
    //   { prop: 'gender', name: 'Gender' },
    //   { prop: 'age', name: 'Age' }
    // ];

    // this.rows = [
    //   {
    //     "name": "Ethel Price",
    //     "gender": "female",
    //     "company": "Johnson, Johnson and Partners, LLC CMP DDC",
    //     "age": 22
    //   },
    //   {
    //     "name": "Claudine Neal",
    //     "gender": "female",
    //     "company": "Sealoud",
    //     "age": 55
    //   },
    //   {
    //     "name": "Beryl Rice",
    //     "gender": "female",
    //     "company": "Velity",
    //     "age": 67
    //   },
    //   {
    //     "name": "Wilder Gonzales",
    //     "gender": "male",
    //     "company": "Geekko"
    //   },
    //   {
    //     "name": "Georgina Schultz",
    //     "gender": "female",
    //     "company": "Suretech"
    //   },
    //   {
    //     "name": "Carroll Buchanan",
    //     "gender": "male",
    //     "company": "Ecosys"
    //   },
    //   {
    //     "name": "Valarie Atkinson",
    //     "gender": "female",
    //     "company": "Hopeli"
    //   },
    //   {
    //     "name": "Schroeder Mathews",
    //     "gender": "male",
    //     "company": "Polarium"
    //   },
    //   {
    //     "name": "Lynda Mendoza",
    //     "gender": "female",
    //     "company": "Dogspa"
    //   }
    // ];
  }

}
