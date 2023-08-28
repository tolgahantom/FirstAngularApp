import { NgModule } from '@angular/core';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AdminGuard } from '../authentication/admin.guard';

@NgModule({
  declarations: [CategoryCreateComponent, CategoryListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthenticationModule,
    RouterModule.forChild([
      {
        path: 'category/create',
        component: CategoryCreateComponent,
        canActivate: [AdminGuard],
      },
    ]),
  ],
  exports: [CategoryCreateComponent, CategoryListComponent],
})
export class CategoryModule {}
