import { Component, Input, inject } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
@Component({
  selector: 'app-password-group',
  templateUrl: './password-group.component.html',
  styleUrls: ['./password-group.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ]
})
export class PasswordGroupComponent {

  constructor(
    private nonNullableFormBuilder: NonNullableFormBuilder
  ){}
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  
  passwordGroup = this.nonNullableFormBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
    repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
  },{
    validators:[equivalentPassword('password', 'repeatPassword')]
  })

  @Input() set userPassword( actualPassword: string){
    this.passwordGroup = this.nonNullableFormBuilder.group({
      password: [actualPassword, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
    },{
      validators:[equivalentPassword('password', 'repeatPassword')]
    })
  }

  ngOnInit(){
    this.parentFormGroup.addControl('passwordGroup',
    this.passwordGroup
    )
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl('passwordGroup');
  }

  get password(){
    return this.passwordGroup.get('password');
  }

  get repeatPassword(){
    return this.passwordGroup.get('repeatPassword');
  }
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