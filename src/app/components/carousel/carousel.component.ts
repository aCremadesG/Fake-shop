import { Component, Input } from '@angular/core';
import { Carrousel } from 'src/app/interfaces/carrousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  constructor(

  ){}

  carrouselData = {} as Carrousel;
  carouselIndex: number = 0;
  maxIndex: number = 0;
  @Input() set newImages(value: Carrousel){
    this.carrouselData = value;
    this.maxIndex = this.carrouselData.images.length - 1;
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
