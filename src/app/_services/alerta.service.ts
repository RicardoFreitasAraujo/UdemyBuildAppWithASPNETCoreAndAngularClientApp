import { Injectable } from '@angular/core';
import { ToastrService  } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private toastr: ToastrService) { }

  public confirm(mesage: string, okCallback:() => any) {
    this.toastr.show(mesage,'Confirmar');
  }

  public success(message: string) {
    this.toastr.success(message,'Success');
  }

  public error(message:string) {
    this.toastr.error(message,'Error');
  }

  public warning(message:string) {
    this.toastr.warning(message);
  }

  public message(message: string) {
    this.toastr.info(message,'Information');
  }

}
