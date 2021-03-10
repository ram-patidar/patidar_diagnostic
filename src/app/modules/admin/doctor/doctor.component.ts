import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { DoctorserviceService } from 'src/app/services/doctorservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  eventsSubject: Subject<void> = new Subject<void>();
  displayEditDoctor = false;
  displayAddDoctor = false;
  deletedData:any;
  mainDoctorToast = false;
  @ViewChild('search', { static: false }) search: any;
  public dataall: any;
  public temp: any;
  public selected = [];
  public testdata = [];
  public editData = [];
  public count = 100;
  public pageSize = 1;
  public limit = 5;
  public offset = 0;
  public rowdata = [];
  billingData = [];
  loadingIndicator = true;
  columns = [{ name: 'Doctor', prop: 'name', width: 100 }, { name: 'Occupation', prop: 'ocupation', width: 100 }, { name: 'Contact', prop: 'contact', width: 100 }];
  constructor(private docService:DoctorserviceService, private _toastService:ToastService, private SpinnerService: NgxSpinnerService) { }

   // Edit doctor popup
  displayDoctor(){
    this.displayEditDoctor = true;
  }

  toggleDisplayEditDoctor(v){
    this.displayEditDoctor = v ;
  }

  // Add doctor popup
  displayAdDoctor(){
    this.displayAddDoctor = true;
  }

  toggleDisplayAddDoctor(v){
    this.displayAddDoctor = v ;
  }

  ngOnInit(): void {
    this.get_data();
  }

  onActivate(event: any) {
    //console.log('Activate Event', event);
  }

  public changeLimit(event: any): void {
    this.limit = parseInt(event.target.value);

  }

  public onPage(event: any): void {
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

  editDoctor(row){
    this.displayEditDoctor = true;  
    this.eventsSubject.next(row);
  
  }

  deleteDoctor(id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.docService.deleteDoctor(id).subscribe(data => {
          console.log(data);
          this.mainDoctorToast = true;
          this._toastService.success('Doctor Deleted Sucessfully');
          this.get_data();
      
        });
      }
    })

  }

  get_data() {
    this.docService.getDoctor().subscribe(data => {
      this.temp = data;
      this.dataall = [...this.temp];
      this.loadingIndicator = false;
    });
  }


}
