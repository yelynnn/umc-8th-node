export const bodyToReview = (body) => {
  return {
    rating: body.rating,
    comment: body.comment,
    images: body.imageUrls || [],
  };
};
