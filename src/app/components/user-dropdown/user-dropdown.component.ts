import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  
  @Output() showForm = new EventEmitter<number>();
  
  openForm(formType: number){
    this.showForm.emit(formType);
  }
}
