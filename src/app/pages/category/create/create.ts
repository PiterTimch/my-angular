import { Component } from '@angular/core';
import { ICategoryCreate } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {serialize} from 'object-to-formdata';

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
  errorMessage: string | null = null;

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private router: Router) {
    this.categoryForm = fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      imageFile: null
    })

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Можна завантажувати лише зображення';
        return;
      }

      this.categoryForm.patchValue({
        imageFile: file
      });
      this.categoryForm.get('imageFile')?.updateValueAndValidity();
      this.imagePreview = URL.createObjectURL(file);
    }
    else {
      this.categoryForm.patchValue({
        imageFile: null
      });
      this.imagePreview = null;
    }
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    this.errorMessage = null;

    const formData = serialize(this.categoryForm.value);

    this.categoryService.createCategory(formData).subscribe({
      next: (res) => {
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
