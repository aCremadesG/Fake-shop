import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SectionComponent } from './pages/section/section.component';
import { ProductComponent } from './pages/product/product.component';
import { CartViewComponent } from './pages/cart-view/cart-view.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'shop',
    component: SectionComponent
  },
  {
    path: 'product/:name',
    component: ProductComponent
  },
  {
    path: 'cart',
    component: CartViewComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
