export const bodyToMission = (body) => {
  return {
    description: body.description,
    reward: body.reward,
    deadline: body.deadline,
  };
};
