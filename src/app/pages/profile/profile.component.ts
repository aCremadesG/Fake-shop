import { Component } from '@angular/core';
import { Validators, NonNullableFormBuilder } from '@angular/forms';
import { AuthjwtService } from 'src/app/services/authjwt.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  subscription: Subscription;
  user: User = {} as User;

  constructor(
    private authJWTService: AuthjwtService,
    private usersService: UsersService,
    private nonNullableFormBuilder: NonNullableFormBuilder,
    private router: Router
  ){
    this.subscription = this.authJWTService.getLocalUser().subscribe(res => {
      this.user = res.user.returnUser;
      if(!res.user.returnLogged){
        this.router.navigate([''])
      }
      this.userForm = this.nonNullableFormBuilder.group({
        email: [this.user.email, [Validators.required, Validators.email]],
        username: [this.user.name, Validators.required],
      })
    })
  }
  userForm = this.nonNullableFormBuilder.group({
    email: [this.user.email, [Validators.required, Validators.email]],
    username: [this.user.name, Validators.required],
  })


  ngOnInit(){

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  resetProfile(){
    this.userForm.reset();
  }

  userModify(){
    if("passwordGroup" in this.userForm.value){
      console.log(this.userForm.value)
      if(typeof this.userForm.value.passwordGroup === "object"){
        if("password" in this.userForm.value.passwordGroup!){
          if(typeof this.userForm.value.passwordGroup.password === "string")
          this.usersService.updateUser(this.user.id!, {email: this.userForm.value.email,password: this.userForm.value.passwordGroup.password, name: this.userForm.value.username}).pipe(
          ).subscribe((updatedUser)=>{
            this.authJWTService.saveUser(updatedUser);
          })
        }
      }
    }
  }
}
