import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { serialize } from 'object-to-formdata';
import { ErrorUtils } from '../../../utils/ErrorUtils';
import { CategoryService } from '../../../services/category.service';
import {FormGroup} from '@angular/forms';
import {CategoryFormTemplate} from '../../../components/category-form-template/category-form-template';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CategoryFormTemplate],
  templateUrl: './create.html',
})
export class CategoryCreate {
  errorMessage: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    const formData = serialize(form.value);

    this.categoryService.createCategory(formData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMessage = ErrorUtils.handleValidation(err, form);
      }
    });
  }
}
