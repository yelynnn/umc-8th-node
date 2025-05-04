import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { writeReview } from "../services/review.service.js";

export const handleWriteReview = async (req, res, next) => {
  try {
    console.log("리뷰 작성을 요청했습니다!");
    console.log("params:", req.params);
    console.log("body:", req.body);

    const missionId = req.params.missionId;
    const reviewData = bodyToReview(req.body);
    const userId = 1;
    const review = await writeReview(userId, missionId, reviewData);
    res.status(StatusCodes.OK).json({ result: review });
  } catch (error) {
    console.error("리뷰 작성 오류:", error.message);
  }
};
