import { Component } from '@angular/core';
import { ICategoryCreate } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  selectedFile?: File;
  errorMessage: string | null = null;

  constructor(private categoryService: CategoryService, private router: Router) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFile = undefined;
      this.category.imageFile = '';
      this.imagePreview = null;
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Можна завантажувати лише зображення';
      return;
    }

    this.selectedFile = file;

    // preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.category.imageFile = reader.result as string; // для форми, string
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('name', this.category.name);
    formData.append('slug', this.category.slug);

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile, this.selectedFile.name); // реальний файл для сервера
    }

    this.categoryService.createCategory(formData).subscribe({
      next: (res) => {
        console.log('Created:', res);
        this.category = { name: '', slug: '', imageFile: '' };
        this.selectedFile = undefined;
        this.imagePreview = null;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error, check all fields';
      }
    });
  }
}
