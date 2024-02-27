import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorAlertService } from 'src/app/services/error-alert.service';

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss']
})
export class ErrorToastComponent {

  subscription: Subscription;
  hidde: boolean = true;
  message: string = '';

  constructor(
    private errorAlertService: ErrorAlertService,
    private router: Router
  ){
    this.subscription = this.errorAlertService.getData().subscribe(res => {
      this.message = res.error;
      this.openToast();
    })
  }

  closeToast(){
    this.router.navigate([``]);
    this.hidde = true;
  }

  openToast(){
    this.hidde = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
