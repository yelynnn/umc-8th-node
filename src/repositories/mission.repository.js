import { pool } from "../db.config.js";

export const getStoreNameByStoreId = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT name FROM store WHERE id = ?", [
      storeId,
    ]);
    if (rows.length === 0) {
      throw new Error("존재하지 않는 가게입니다.");
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
    throw new Error(`미션 생성 중 오류가 발생했어요. (${err.message})`);
  } finally {
    conn.release();
  }
};
