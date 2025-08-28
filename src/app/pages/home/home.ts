import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
      console.log("Home on init");
      this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

}
