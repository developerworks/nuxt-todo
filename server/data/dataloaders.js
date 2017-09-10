import DataLoader from 'dataloader';

async function batchUsers (Users, keys) {
  const users = await Users.findAll({where: {id: {$in: keys}}});
  return users;
};

export default ({Users}) => ({
  userLoader: new DataLoader(
    keys => batchUsers(Users, keys)
  )
});
