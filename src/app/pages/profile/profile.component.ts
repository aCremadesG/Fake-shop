import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthjwtService } from 'src/app/services/authjwt.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

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
    private usersService: UsersService
  ){
    this.subscription = this.authJWTService.getLocalUser().subscribe(res => {
      this.user = res.user.returnUser
    })
  }

  userForm = new FormGroup({
    email: new FormControl(this.user.email, {validators: [Validators.required, Validators.email]}),
    password: new FormControl(this.user.password, {validators: [Validators.required, Validators.minLength(8)]}),
    repeatPassword: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
    username: new FormControl(this.user.name, Validators.required),
  },{
    validators:[equivalentPassword('password', 'repeatPassword')]
  })

  ngOnInit(){
    this.authJWTService.sendLocalUser();
    this.userForm = new FormGroup({
      email: new FormControl(this.user.email, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(this.user.password, {validators: [Validators.required, Validators.minLength(8)]}),
      repeatPassword: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
      username: new FormControl(this.user.name, Validators.required),
    },{
      validators:[equivalentPassword('password', 'repeatPassword')]
    })
  }

  resetProfile(){
    this.userForm = new FormGroup({
      email: new FormControl(this.user.email, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(this.user.password, {validators: [Validators.required, Validators.minLength(8)]}),
      repeatPassword: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
      username: new FormControl(this.user.name, Validators.required),
    },{
      validators:[equivalentPassword('password', 'repeatPassword')]
    })
  }

  userModify(){
    this.usersService.updateUser(this.user.id!, {email: this.userForm.value.email!,password: this.userForm.value.password!, name: this.userForm.value.username!}).pipe(

    ).subscribe((updatedUser)=>{
      this.authJWTService.saveUser(updatedUser);
    })
  }

}

export function equivalentPassword(firstControlName: string, secondControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstControl = control.get(firstControlName);
    const secondControl = control.get(secondControlName);
  
    if (secondControl!.value && secondControl!.value !== firstControl!.value) {
      secondControl!.setErrors({ notEqual: true });
    }
  
    return null;
  };
}
