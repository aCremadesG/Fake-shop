import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { Section } from 'src/app/interfaces/section';

@Component({
  selector: 'app-products-group',
  templateUrl: './products-group.component.html',
  styleUrls: ['./products-group.component.scss']
})
export class ProductsGroupComponent {

  constructor(
    private router: Router
  ) {}

  @Input() section = {} as Section;

  redirectTo(url: string){
    this.router.navigate([url])
  }
}
