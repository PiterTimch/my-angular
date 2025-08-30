import { Component } from '@angular/core';
import { ICategoryCreate } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class CategoryCreate {
  category: ICategoryCreate = { name: '', slug: '' };
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string | null = null; // додано

  constructor(private categoryService: CategoryService) {}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.category.image = event.target.files[0];

      if (this.category.image) {
        const reader = new FileReader();
        reader.onload = e => this.imagePreview = reader.result;
        reader.readAsDataURL(this.category.image);
      }
    }
  }

  onSubmit() {
    this.errorMessage = null; // очищаємо перед сабмітом

    this.categoryService.createCategory(this.category).subscribe({
      next: (res) => {
        console.log('Created:', res);
        this.category = { name: '', slug: '' }; // очищаємо форму
        this.imagePreview = null;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Сталася помилка при створенні категорії.';
      }
    });
  }
}
