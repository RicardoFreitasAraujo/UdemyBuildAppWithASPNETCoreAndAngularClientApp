import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertaService } from 'src/app/_services/alerta.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  
  user: User;
  photoURL:string;
  public unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private userService: UserService, 
              private authService: AuthService,
              private alerta: AlertaService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.authService.currentPhotoURL.subscribe(u => this.photoURL = u);
  }

  public updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid,
                                this.user).subscribe(
                                  next => {
                                    this.alerta.success('Profile updated');
                                    this.editForm.reset(this.user);
                                  },
                                  error => {
                                    this.alerta.error(error);
                                  }
                                );
    
  }

  public updateMainPhoto(photoUrl:string) {
    this.user.photoURL = photoUrl;
  }

}
