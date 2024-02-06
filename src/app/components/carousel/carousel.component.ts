import { Component, Input } from '@angular/core';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  constructor(

  ){}

  categories = [] as Category[];
  carouselIndex: number = 0;
  maxIndex: number = 0;
  @Input() set newCategories(value: Category[]){
    this.categories = value;
    this.maxIndex = this.categories.length - 1;
  }

  carouselPrev(){
    if(this.carouselIndex == 0)this.carouselIndex = this.maxIndex;
    else this.carouselIndex --;
    
  }

  carouselNext(){
    if(this.carouselIndex == this.maxIndex)this.carouselIndex = 0;
    else this.carouselIndex ++;
  }

  carouselTo(i: number){
    this.carouselIndex = i;
  }
}
