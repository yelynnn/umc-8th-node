import {
  createMission,
} from "../repositories/mission.repository.js";

export const addMission = async (storeId, data) => {

  const missionId = await createMission(
    storeId,
    data.description,
    data.reward,
    data.deadline
  );

  return { missionId, message: "미션이 등록되었습니다." };
};
