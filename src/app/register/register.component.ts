import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'util';
import { AlertaService } from '../_services/alerta.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output('cancelRegister') cancelRegister = new EventEmitter<any>();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private alerta: AlertaService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  public createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knowAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['',[Validators.required,Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  public passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  public register() {
    
    if (this.registerForm.valid) {
        this.user = Object.assign({},this.registerForm.value);
        this.authService.register(this.user).subscribe(() => {
          this.alerta.success('Registration sucessfully');
        }, error => {
          this.alerta.error(error);
        }, () => {
          this.authService.login(this.user).subscribe( () => {
            this.router.navigate(['/members']);
          });
        });
    }
  }

  public cancel() {
    this.cancelRegister.emit(false);
    this.alerta.message('cancelled');
  }

}
