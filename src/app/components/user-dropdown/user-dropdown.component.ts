import { Component, EventEmitter, Output } from '@angular/core';
import { AuthjwtService } from 'src/app/services/authjwt.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalUser } from 'src/app/classes/local-user';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  
  subscription: Subscription;
  user: LocalUser = new LocalUser();
  
  constructor(
    private authJWTService: AuthjwtService,
    private router: Router,
  ){
    this.subscription = this.authJWTService.getLocalUser().subscribe(res => {
      this.user = res.user
    })
  }
  
  ngOnInit(){
  }

  @Output() showForm = new EventEmitter<number>();
  
  openForm(formType: number){
    this.showForm.emit(formType);
  }

  redirectTo(url: string){
    this.router.navigate([url])
  }

  logOut(){
    this.authJWTService.closeSesion();
  }
}
