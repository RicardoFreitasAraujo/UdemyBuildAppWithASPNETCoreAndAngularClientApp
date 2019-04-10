import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertaService } from '../../_services/alerta.service';
import { PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  pageNumber = 1;
  pageSize = 5;
  users: User[];

  constructor(private userService: UserService, private alerta:AlertaService) { }

  ngOnInit() {
    this.LoadUser();
  }

  public LoadUser() {
    this.userService.getUsers(this.pageNumber, this.pageSize).subscribe( (retorno: any) => {
        console.info(retorno);
        this.users = retorno.result;
    })
  }

}
