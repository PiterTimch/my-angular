import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ICategory} from '../../models/Category';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  categories: ICategory[] = [];

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


}
