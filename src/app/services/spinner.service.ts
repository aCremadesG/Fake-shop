import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(
    private spinnerService: NgxSpinnerService
  ) { }

  public callSpinner(){
    this.spinnerService.show();
  }

  public stopSpinnerService(){
    this.spinnerService.hide();
  }
}
