import {
  getAllStoreReviews,
  getAllStoreMissions,
} from "../repositories/store.repository.js";

export const listStoreReviews = async (storeId, cursor) => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (storeId, cursor) => {
  const missions = await getAllStoreMissions(storeId, cursor);
  return missions; 
};
