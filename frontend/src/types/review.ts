

export type TReview = {
        createdAt: Date;
        _id: string;
        review: string,
        rating: number,
        tour: ReviewTourData,
        user: ReviewUserData,
        edited: boolean,
        id: string;
}

export type ReviewUserData = {
    _id: string;
    firstname: string;
    lastname: string;
    photo?: string;
}

export type ReviewTourData = {
    _id: string;
    name: string;
    imageCover: string;
    slug: string;
}