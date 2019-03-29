import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertaService } from 'src/app/_services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, 
              private alertaService: AlertaService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  //member/4
  public loadUser() {
    let idUsuario: number = parseInt(this.route.snapshot.params['id']);
    this.userService.getUser(idUsuario).subscribe((user: User) => {
      this.user = user;
    }, erro => {
      this.alertaService.error(erro);
    });
  }

}
