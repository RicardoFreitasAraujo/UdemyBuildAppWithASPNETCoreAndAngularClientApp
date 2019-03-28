import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { AlertaService } from '../_services/alerta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService, 
              private alerta: AlertaService, 
              private router: Router) { }

  ngOnInit() {
  }

  public login() {
    this.authService.login(this.model).subscribe(next => {
      this.alerta.success('Logged in sucessfully');
    }, error => {
      this.alerta.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  public loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  public logout():void {
    localStorage.removeItem('token');
    this.alerta.message('logged out');
    this.router.navigate(['/home']);
  }

}
