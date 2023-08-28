import { Component, OnInit } from '@angular/core';
import { Category } from '../categories.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryService],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null;
  displayAll = true;

  constructor(private categoryServices: CategoryService) {}

  ngOnInit(): void {
    this.categoryServices.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  selectCategory(category?: Category): void {
    // ? means category can be null
    if (category) {
      this.selectedCategory = category;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }
}
