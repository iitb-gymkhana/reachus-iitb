import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    $('.navbar-item').each(function(e) {
      $(this).click(function() {
        if ($('#navbar-burger').hasClass('is-active')) {
          $('#navbar-burger').removeClass('is-active');
          $('#portal-navbar').removeClass('is-active');
        }
      });
    });

    $('#navbar-burger').click(function () {
      if ($('#navbar-burger').hasClass('is-active')) {
        $('#navbar-burger').removeClass('is-active');
        $('#portal-navbar').removeClass('is-active');
      } else {
        $('#navbar-burger').addClass('is-active');
        $('#portal-navbar').addClass('is-active');
      }
    });
  }
}
