import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertaService } from '../_services/alerta.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[];

  constructor(private authService: AuthService, 
              private userService: UserService,
              private route: ActivatedRoute,
              private alerta: AlertaService) { }

  ngOnInit() {
    this.userService.getUsers(null,null,'Likers').subscribe((retorno:any) => {
      this.users = retorno.result;
    }, error => {
      console.log(error);
    })
  }

}
