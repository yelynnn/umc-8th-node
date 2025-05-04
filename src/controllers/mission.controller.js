import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addMission } from "../services/mission.service.js";

export const handleCreateMission = async (req, res, next) => {
  try {
    console.log("미션 추가를 요청했습니다!");
    console.log("params:", req.params);
    console.log("body:", req.body);

    const storeId = parseInt(req.params.storeId, 10);
    const missionData = bodyToMission(req.body);
    const mission = await addMission(storeId, missionData);
    res.status(StatusCodes.OK).json({ result: mission });
  } catch (error) {
    console.error("리뷰 작성 오류:", error.message);
  }
};
