import {
  createReview,
  createReviewImage,
  getStoreIdByMissionId,
  getMyReviewList,
} from "../repositories/review.repository.js";

const writeReview = async (userId, missionId, data) => {
  const storeId = await getStoreIdByMissionId(missionId);

  const reviewId = await createReview(
    userId,
    data.rating,
    data.comment,
    storeId
  );

  for (const imageUrl of data.images) {
    await createReviewImage(reviewId, imageUrl);
  }

  return { reviewId, message: "리뷰가 등록되었습니다." };
};

const getMyReview = async (userId, cursor) => {
  const myReviews = await getMyReviewList(userId, cursor);
  return myReviews;
};

export { writeReview, getMyReview };
