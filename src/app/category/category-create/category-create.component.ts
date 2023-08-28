import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService],
})
export class CategoryCreateComponent {
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  crateCategory(categoryName: any) {
    const category = {
      id: 3,
      name: categoryName.value,
    };

    this.categoryService.createCateory(category).subscribe((data) => {
      this.router.navigate(['products/']);
    });
  }
}
