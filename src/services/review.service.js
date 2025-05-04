import {
  createReview,
  createReviewImage,
  getStoreIdByMissionId,
} from "../repositories/review.repository.js";

export const writeReview = async (userId, missionId, data) => {
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
