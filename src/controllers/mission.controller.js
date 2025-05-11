import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addMission, getMyMission } from "../services/mission.service.js";

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

export const handleGetMyMission = async (req, res, next) => {
  try {
    const userMissions = await getMyMission(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: userMissions });
  } catch (error) {
    console.error("미션 조회 오류:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
