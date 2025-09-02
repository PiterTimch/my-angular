import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import {
  FormGroup,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {serialize} from 'object-to-formdata';
import {ErrorUtils} from '../../../utils/ErrorUtils';
import {CategoryFormTemplate} from '../../../components/category-form-template/category-form-template';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CategoryFormTemplate],
  templateUrl: './edit.html',
})
export class CategoryEdit {
  errorMessage: string | null = null;
  slug: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.slug = this.route.snapshot.paramMap.get('slug');
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    console.log(form.value);

    const formData = serialize(form.value);

    this.categoryService.editCategory(formData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMessage = ErrorUtils.handleValidation(err, form);
      }
    });
  }
}
