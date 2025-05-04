import { pool } from "../db.config.js";

export const getStoreIdByMissionId = async (missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT store_id FROM mission WHERE id = ?",
      [missionId]
    );
    if (rows.length === 0) {
      throw new Error("존재하지 않는 미션입니다.");
    }
    return rows[0].store_id;
  } finally {
    conn.release();
  }
};

export const createReview = async (userId, rating, comment, storeId) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      "INSERT INTO review (user_id, rating, comment,store_id) VALUES (?, ?, ?,?);",
      [userId, rating, comment, storeId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`리뷰 저장 중 오류가 발생했어요. (${err.message})`);
  } finally {
    conn.release();
  }
};

export const createReviewImage = async (reviewId, imageUrl) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      "INSERT INTO review_image (review_id,image_url) VALUES (?,?);",
      [reviewId, imageUrl]
    );
  } catch (err) {
    throw new Error(`이미지 저장 중 오류가 발생했어요. (${err.message})`);
  } finally {
    conn.release();
  }
};
