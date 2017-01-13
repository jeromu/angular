import { Injectable } from '@angular/core';
import { Review } from './review';
import { FakeDb } from './fake-db';


@Injectable()
export class ReviewService {
  getReviews(): Promise<Review[]> {
    return FakeDb.getReviews();
  }

  addReview(r: Review): Promise<void> {
    return FakeDb.addReview(r);
  }
}
