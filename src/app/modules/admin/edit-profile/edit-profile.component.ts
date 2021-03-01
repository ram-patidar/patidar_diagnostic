import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

 @Output() onToggleProfile = new EventEmitter<boolean>();
 onToggle(profile: boolean){
  this.onToggleProfile.emit(profile);
}

  constructor() { }

  ngOnInit(): void {
  }

}
