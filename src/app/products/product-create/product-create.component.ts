import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/categories.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [CategoryService],
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  error: string = '';
  model: any = {
    categoryId: 0,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  createProduct() {
    const extensions = ['jpeg', 'jpg', 'png'];
    const extension = this.model.imageUrl.split('.').pop();

    if (extensions.indexOf(extension) == -1) {
      this.error =
        'The image extension cannot be different from PNG, JPEG, JPG.';
      return;
    }

    if (this.model.categoryId == 0) {
      this.error = 'You must choose a category';
      return;
    }

    const newProduct = {
      id: 1,
      name: this.model.name,
      price: this.model.price,
      imageUrl: this.model.imageUrl,
      isActive: this.model.isActive,
      description: this.model.description,
      categoryId: this.model.categoryId,
    };

    this.productService.createProduct(newProduct).subscribe((data) => {
      this.router.navigate(['/products']);
    });
  }
}
