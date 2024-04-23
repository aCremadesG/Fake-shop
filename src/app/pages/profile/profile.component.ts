import { Component } from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors, NonNullableFormBuilder } from '@angular/forms';
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
    private usersService: UsersService,
    private nonNullableFormBuilder: NonNullableFormBuilder
  ){
    this.subscription = this.authJWTService.getLocalUser().subscribe(res => {
      this.user = res.user.returnUser
    })
  }

  userForm = this.nonNullableFormBuilder.group({
    email: [this.user.email, [Validators.required, Validators.email]],
    password: [this.user.password, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
    repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
    username: [this.user.name, Validators.required],
  },{
    validators:[equivalentPassword('password', 'repeatPassword')]
  })

  ngOnInit(){
    this.authJWTService.sendLocalUser();
    this.userForm = this.nonNullableFormBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      username: [this.user.name, Validators.required],
    },{
      validators:[equivalentPassword('password', 'repeatPassword')]
    })
  }

  resetProfile(){
    this.userForm.reset();
  }

  userModify(){
    this.usersService.updateUser(this.user.id!, {email: this.userForm.value.email,password: this.userForm.value.password, name: this.userForm.value.username}).pipe(

    ).subscribe((updatedUser)=>{
      this.authJWTService.saveUser(updatedUser);
    })
  }

  get password(){
    return this.userForm.get('password');
  }

  get repeatPassword(){
    return this.userForm.get('repeatPassword');
  }

}

export function equivalentPassword(firstControlName: string, secondControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstControl = control.get(firstControlName);
    const secondControl = control.get(secondControlName);
  
    if((secondControl!.dirty || secondControl!.touched) && (firstControl!.dirty || firstControl!.touched)){
      if (secondControl!.value && secondControl!.value !== firstControl!.value) {
        secondControl!.setErrors({ notEqual: true });
      }else{
        secondControl!.setErrors(null);
      }
    }
    return null;
  };
}

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const value = control.value;

    if (!value) {
        return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return !passwordValid ? {passwordStrength:true}: null;
  }
}
