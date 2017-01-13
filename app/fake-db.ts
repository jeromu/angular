import { Review } from './review';

class LocalStorageDb {
    private _getReviews(): Review[] {
        let reviews: Review[];

        if (localStorage["reviews"]) {
            reviews = JSON.parse(localStorage["reviews"]);
            if (!Array.isArray(reviews)) {
                reviews = [];
            }
        } else {
            reviews = [];
        }
        return reviews;
    }

    // Using promise and delay to simulate back-end call
    getReviews(): Promise<Review[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this._getReviews());
            }, 50)
        });
    }

    // Using promise and delay to simulate back-end call
    addReview(r: Review): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const reviews = this._getReviews();
                reviews.push(r);
                localStorage["reviews"] = JSON.stringify(reviews);
                resolve();
            }, 50)
        });
    }

}

export const FakeDb = new LocalStorageDb();
