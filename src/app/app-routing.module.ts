import { NgModule, inject } from '@angular/core';
import { Route, Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SectionComponent } from './pages/section/section.component';
import { ProductComponent } from './pages/product/product.component';
import { CartViewComponent } from './pages/cart-view/cart-view.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthjwtService } from './services/authjwt.service';
import { map } from 'rxjs';
import { RegisterComponent } from './pages/register/register.component';

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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canMatch: [(route: Route, segments: UrlSegment[]) => {
      const router = inject(Router);
      return inject(AuthjwtService).isAuthenticatedUser() ? true : router.createUrlTree([''])
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
