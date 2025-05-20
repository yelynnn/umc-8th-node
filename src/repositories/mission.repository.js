import { pool, prisma } from "../db.config.js";

export const getStoreNameByStoreId = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT name FROM store WHERE id = ?", [
      storeId,
    ]);
    if (rows.length === 0) {
      throw new DuplicateUserEmailError("존재하지 않는 가게입니다.", data);
    }
    return rows[0].name;
  } finally {
    conn.release();
  }
};

export const createMission = async (storeId, description, reward, deadline) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      "INSERT INTO mission (store_id,description, reward_point, deadline) VALUES (?, ?, ?, ?);",
      [storeId, description, reward, deadline]
    );
    return result.insertId;
  } catch (err) {
    throw new DuplicateUserEmailError(
      "미션 생성 중 오류가 발생했습니다.",
      data
    );
  } finally {
    conn.release();
  }
};

export const getAllUserMissions = async (userId, cursor) => {
  const missions = await prisma.mission.findMany({
    where: {
      usersMissions: {
        some: {
          userId: userId,
          status: "ongoing",
          missionId: { gt: cursor },
        },
      },
    },
    select: {
      id: true,
      description: true,
      rewardPoint: true,
      deadline: true,
    },
    orderBy: {
      deadline: "desc",
    },
  });

  return missions;
};
