import { StatusCodes } from "http-status-codes";
import { tryMission } from "../services/tryMission.service.js";

export const handleTryMission = async (req, res, next) => {
  try {
    console.log("미션 도전을 요청했습니다!");
    console.log("params:", req.params);
    console.log("body:", req.body);
    const userId = parseInt(req.params.userId, 10);
    const missionId = parseInt(req.params.missionId, 10);

    const tryData = await tryMission(userId, missionId);
    res.status(StatusCodes.OK).json({ result: tryData });
  } catch (error) {
    console.error("미션 도전 오류:", error.message);
  }
};
