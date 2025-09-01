import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ICategory} from '../../models/Category';
import {environment} from '../../../environments/environment';
import {DialogModal} from '../../components/dialog-modal/dialog-modal';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, DialogModal],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  categories: ICategory[] = [];

  isDeleteModalOpen = false;
  idToDelete: number = -1;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
      console.log("Home on init");
      this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log("Отримані категорії:", this.categories);
      },
      error => console.log(error)
    );
  }

  onDeleteModalSubmitted() {
    this.categoryService.deleteCategory(this.idToDelete).pipe(
      finalize(() => {
        this.isDeleteModalOpen = false;
        this.idToDelete = -1;
        this.getCategories();
      })
    ).subscribe();
  }


  protected readonly environment = environment;
}
