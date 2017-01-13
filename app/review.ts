export class Review {
    comment: string;
    createdAt: Date;

    constructor(comment : string) {
        this.comment = comment;
        this.createdAt = new Date();
    }
}
