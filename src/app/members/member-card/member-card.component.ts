import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertaService } from 'src/app/_services/alerta.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;

  constructor(private authService: AuthService, 
              private userService: UserService,
              private alertaService: AlertaService) { }

  ngOnInit() {
  }

  public sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid,id)
         .subscribe(data => {
           this.alertaService.success('You have liked: ' + this.user.knowAs);
         }, error => {
           this.alertaService.error(error);
         })
  }

}
