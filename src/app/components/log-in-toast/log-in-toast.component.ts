import { Component, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { AuthjwtService } from 'src/app/services/authjwt.service';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-log-in-toast',
  templateUrl: './log-in-toast.component.html',
  styleUrls: ['./log-in-toast.component.scss']
})
export class LogInToastComponent {
  
  constructor(
    private formBuilder : FormBuilder,
    private authjwtService: AuthjwtService
  ){}

  errorMessage: string = '';

  @Output() showForm = new EventEmitter<number>();

  loginForm = this.formBuilder.group({
    email: ['john@mail.com', Validators.required],
    password: ['changeme', Validators.required],
  })
  
  ngOnInit(){}

  closeToast(){
    this.showForm.emit(0);
  }

  userLogin(){
    if(this.loginForm.valid){
      const user: User = {email: this.loginForm.value.email!, password: this.loginForm.value.password!}
      this.authjwtService.authentication(user).pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      ).subscribe((userTokens)=>{
        this.authjwtService.saveTokens(userTokens);
        this.getUser();
        this.closeToast();
      })
    }
  }

  getUser(){
    this.authjwtService.getUser().pipe(
      catchError(err => {
        console.log(err);
        return EMPTY;
      })
    ).subscribe((userData) =>{
      this.authjwtService.saveUser(userData);
      this.authjwtService.renewTokens();
    })
  }
}
