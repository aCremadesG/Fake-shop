import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  selectedOption = '';
  categories = [
    {name: "Option1"},
    {name: "Option2"},
    {name: "Option3"},
    {name: "Option4"},
    {name: "Option5"},
    {name: "Option6"}
  ]

  setOption(name: string){
    console.log("test");
    this.selectedOption = name;
  }
}
