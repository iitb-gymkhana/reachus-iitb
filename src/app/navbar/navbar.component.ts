import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    $('.navbar-item').each(function(e) {
      $(this).click(function() {
        if ($('#navbar-burger').hasClass('is-active')) {
          $('#navbar-burger').removeClass('is-active');
          $('#sac-navbar').removeClass('is-active');
        }
      });
    });

    $('#navbar-burger').click(function () {
      if ($('#navbar-burger').hasClass('is-active')) {
        $('#navbar-burger').removeClass('is-active');
        $('#sac-navbar').removeClass('is-active');
      } else {
        $('#navbar-burger').addClass('is-active');
        $('#sac-navbar').addClass('is-active');
      }
    });
  }
}
