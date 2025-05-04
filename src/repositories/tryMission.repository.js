import { pool } from "../db.config.js";

export const checkMissionAlreadyTried = async (userId, missionId) => {
  const conn = await pool.getConnection();

  try {
    const [rows] = await pool.query(
      `SELECT EXISTS(SELECT status FROM users_mission WHERE user_id=? AND mission_id = ?) as MissionStatus;`,
      [userId, missionId]
    );

    if (
      rows.length > 0 &&
      ["in_progress", "completed"].includes(rows[0].status)
    ) {
      return true;
    }

    return false;
  } finally {
    conn.release();
  }
};

export const insertUsersMission = async (userId, missionId) => {
  const conn = await pool.getConnection();

  try {
    const receivedAt = new Date();
    const [result] = await conn.query(
      `INSERT INTO users_mission (user_id, mission_id, status, received_at) VALUES (?, ?, 'in_progress', ?);`,
      [userId, missionId, receivedAt]
    );

    return result.insertId;
  } finally {
    conn.release();
  }
};
