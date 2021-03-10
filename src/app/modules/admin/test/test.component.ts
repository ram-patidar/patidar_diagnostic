import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { fromEvent, Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { TestServiceService } from 'src/app/services/test-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  displayEditTest = false;
  displayAddTest = false;

  constructor(private testService: TestServiceService, private _toastService: ToastService) { }
  eventsSubject: Subject<void> = new Subject<void>();
  displayEditDoctor = false;
  displayAddDoctor = false;
  deletedData: any;
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
  parameterAlldata: any;
  billingData = [];
  loadingIndicator = true;
  columns = [{ name: 'Test name', prop: 'test_name', width: 100 }, { name: 'Test price', prop: 'price', width: 100 }];

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

  editTest(row: any, paradata: any) {
    this.displayEditTest = true;
    row.paradata = paradata.filter(t => t.test_id === row.id);
    this.eventsSubject.next(row);
  }

  deleteTest(id: any) {
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
        this.testService.deleteTest(id).subscribe(data => {
          console.log(data);
          this.mainDoctorToast = true;
          this._toastService.success('Doctor Deleted Sucessfully');
          this.get_data();
        });
      }
    })
  }

  get_data() {
    this.testService.getTest().subscribe(data => {
      this.temp = data;
      this.dataall = [...this.temp];
      this.testService.getParameter().subscribe(data => {
        this.parameterAlldata = data;
      });
      this.loadingIndicator = false;
    });
  }

  // Edit test popup 
  displayEditTests() {
    this.displayEditTest = true;
  }

  toggleDisplayEditTest(v) {
    this.displayEditTest = v;
  }

  // Add test popup 
  displayAddTests() {
    this.displayAddTest = true;
  }

  toggleDisplayAddTest(v) {
    this.displayAddTest = v;
  }
}
