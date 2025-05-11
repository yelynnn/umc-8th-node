import { prisma } from "../db.config.js";

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { id: true, comment: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

export const getAllStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    where: { storeId: storeId, id: { gt: cursor } },
    select: {
      id: true,
      description: true,
      rewardPoint: true,
      deadline: true,
    },
    orderBy: {
      deadline: "desc",
    },
    take: 5,
  });
  return missions;
};
