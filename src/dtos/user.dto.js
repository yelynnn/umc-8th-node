export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};

// export const responseFromUser = ({ user, preferences }) => {
//   const u = user[0];

//   return {
//     id: u.id,
//     email: u.email,
//     name: u.name,
//     gender: u.gender,
//     birth: u.birth,
//     address: u.address,
//     detailAddress: u.spec_address,
//     phoneNumber: u.phone_num,
//     preferences: preferences.map((p) => ({
//       id: p.category_id,
//       name: p.name,
//     })),
//     createdAt: u.created_at,
//   };
// };
