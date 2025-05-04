import {
  checkMissionAlreadyTried,
  insertUsersMission,
} from "../repositories/tryMission.repository.js";

export const tryMission = async (userId, missionId) => {
  const alreadyTried = await checkMissionAlreadyTried(userId, missionId);

  if (alreadyTried === true) {
    throw new Error("이미 도전 중인 미션입니다.");
  }
  const usersMissionId = await insertUsersMission(userId, missionId);

  return { usersMissionId, message: "미션을 도전합니다." };
};
