import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsGroupComponent } from './products-group/products-group.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuyingCardComponent } from './buying-card/buying-card.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    ProductsGroupComponent,
    CarouselComponent,
    DropdownMenuComponent,
    BuyingCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    ProductsGroupComponent,
    CarouselComponent,
    BuyingCardComponent
  ]
})
export class ComponentsModule { }
