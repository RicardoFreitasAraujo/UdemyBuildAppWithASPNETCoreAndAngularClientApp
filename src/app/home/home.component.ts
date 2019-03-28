import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode:boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  public registerToggle() {
    this.registerMode = !this.registerMode; 
  }


  public cancelRegisterMode(registerMode:boolean)
  {
    this.registerMode = registerMode;
  }

}
