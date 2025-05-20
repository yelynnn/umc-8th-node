import { pool, prisma } from "../db.config.js";

export const getStoreIdByMissionId = async (missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT store_id FROM mission WHERE id = ?",
      [missionId]
    );
    if (rows.length === 0) {
      throw new DuplicateUserEmailError("존재하지 않는 미션입니다.", data);
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
    throw new DuplicateUserEmailError(
      "리뷰 저장 중 에러가 발생했습니다.",
      data
    );
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
    throw new DuplicateUserEmailError(
      "이미지 저장 중 에러가 발생했습니다.",
      data
    );
  } finally {
    conn.release();
  }
};

export const getMyReviewList = async (userId, cursor) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId: userId,
        id: { gt: cursor },
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        store: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reviews;
  } catch (err) {
    throw new DuplicateUserEmailError(
      "내 리뷰 불러오기 중 에러가 발생했습니다.",
      data
    );
  }
};
