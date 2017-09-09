import jwt from 'jsonwebtoken';
import _ from 'lodash';
import config from '../config';

const HEADER_REGEX = /bearer token-(.*)$/;

const generateToken = (user) => {
  return jwt.sign({
    user: _.pick(user, ['id', 'email'])
  }, config.SECRET, {expiresIn: '1y'});
};

const verifyToken = async (token) => {
  if (token) {
    try {
      const { user } = await jwt.verify(token, config.SECRET);
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  return null;
};

const authenticate = async ({headers: {authorization}}, Users) => {
  const token = authorization && HEADER_REGEX.exec(authorization)[1];
  const result = await verifyToken(token);
  if (result) {
    const user = await Users.findOne({
      where: {
        id: result.id
      }
    });

    return user;
  }

  return null;
};

export {authenticate, generateToken};
