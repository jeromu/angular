import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReviewService } from './reviews.service';
import { Review } from './review';

@Component({
  selector: 'my-app',
  providers: [ReviewService],
  template: `
  <h1>Hello {{name}}</h1>

  <input #newReview
      (keyup.enter)="addReview(newReview.value)"
      (blur)="addReview(newReview.value); newReview.value='' ">
   <button (click)=addReview(newReview.value)>Add</button>
  <ul>
    <li *ngFor="let item of reviews | paginate: { itemsPerPage: 5, currentPage: p }"> 
      {{ item.createdAt | date:'medium' }} - {{ item.comment }}  
    </li>
  </ul>
  <pagination-controls (pageChange)="p = $event"></pagination-controls>
  `,
})
export class AppComponent implements OnInit {
  name = 'Angular';
  reviews: Review[];

  constructor(private reviewService: ReviewService, private ref: ChangeDetectorRef) { }

  getReviews(): void {
    this.reviewService.getReviews().then(reviews => {
      this.reviews = reviews;
      this.sortReviews();
    });
  }

  sortReviews(): void {
    this.reviews.sort((a: Review, b: Review) => {
      if (a.createdAt > b.createdAt)
        return -1;
      if (a.createdAt < b.createdAt)
        return 1;
      else
        return 0;
    });
  }

  ngOnInit(): void {
    this.getReviews();
  }

  addReview(comment: string) {
    if (comment) {
      this.reviewService.addReview(new Review(comment))
        .then(() => {
          this.getReviews();
        });
    }
  }

}
