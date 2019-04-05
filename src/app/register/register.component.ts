import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'util';
import { AlertaService } from '../_services/alerta.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output('cancelRegister') cancelRegister = new EventEmitter<any>();
  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private alerta: AlertaService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  public createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',[Validators.required,Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  public passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  public register() {
    /*
    this.authService.register(this.model).subscribe(() => {
      this.alerta.success('registration sucessfully');
      this.cancel();
    }, error => {
      this.alerta.error(error);
    });*/

    console.log(this.registerForm.value);
  }

  public cancel() {
    this.cancelRegister.emit(false);
    this.alerta.message('cancelled');
  }

}
