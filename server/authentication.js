const HEADER_REGEX = /bearer token-(.*)$/;

export async function authenticate ({headers: {authorization}}, Users) {
  const email = authorization && HEADER_REGEX.exec(authorization)[1];
  const user = await Users.findOne({where: {email: email}});
  return email && user;
};
