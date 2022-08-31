export const validId = (id: string) => {
  const regExprMongoID = new RegExp(/^[0-9a-fA-F]{24}$/);
  return id.match(regExprMongoID);
};
