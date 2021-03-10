import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authservice: AuthserviceService) { }

  ngOnInit(): void {

    // jquery start
    $(document).ready(function () {
      $(".menu-button").click(function () {
        $(this).toggleClass("open");
        $(".sidebar-main, body").toggleClass("open");
      });
      $(".overlay-close").click(function () {
        $(".sidebar-main, body, .menu-button").removeClass("open");
      });
    });
    // jquery end
  }

  logout() {
    this.authservice.logout();
  }
}
