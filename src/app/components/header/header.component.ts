import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthjwtService } from 'src/app/services/authjwt.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  productsForm = new FormGroup({
    title: new FormControl(""),
    categoryId: new FormControl("")
  });

  hiddenToast: Array<boolean> = [false, false]

  open: boolean = false;
  categories = [] as Category[]
  dropdownId: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private authJWTService: AuthjwtService
  ){}

  ngOnInit(){
    this.categoriesService.getAllCategories().subscribe((newCategories) => {
      this.categories = newCategories;
    });
    this.authJWTService.loadTokens();
  }

  sectionDetail(id: number){
    this.router.navigate([`shop`],{
      queryParams: {categoryId: id}
    })
  }

  redirectTo(url: string){
    this.router.navigate([url])
  }

  onSubmit(){
    let formObject = {} as {title: string, categoryId: string};
    if(this.productsForm.value.title)formObject.title = this.productsForm.value.title;
    if(this.productsForm.value.categoryId)formObject.categoryId = this.productsForm.value.categoryId;
    const queryKeys = Object.keys(formObject);
    if(formObject){
      this.router.navigate([`shop`],{
        queryParams: formObject
      })
    }
  }

  checkString(controlString: string, key:string){
    return `${key}=${controlString}`
  }

  showForm(formType: number){
    this.hiddenToast[formType] = !this.hiddenToast[formType];
  }
}
