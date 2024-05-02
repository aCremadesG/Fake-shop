import { Component } from '@angular/core';
import { Validators, NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private nonNullableFormBuilder: NonNullableFormBuilder,
  ){}
  
  userForm = this.nonNullableFormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
  })

  resetProfile(){
    this.userForm.reset();
  }

  newUser(){

  }

  get email(){
    return this.userForm.get('email');
  }

  get username(){
    return this.userForm.get('username');
  }
}
