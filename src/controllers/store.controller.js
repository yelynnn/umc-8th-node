import {
  listStoreReviews,
  listStoreMissions,
} from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";

export const handleListStoreReviews = async (req, res, next) => {
  try {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (error) {
    console.error("리뷰 목록 조회 오류:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const handleListStoreMissions = async (req, res, next) => {
  try {
    const missions = await listStoreMissions(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: missions });
  } catch (error) {
    console.error("미션 목록 조회 오류:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
