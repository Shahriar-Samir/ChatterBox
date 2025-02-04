import UserModel from '../users/users.model';

const searchUsersAndGroupsFromDB = async (searchTerm: string) => {
  const splitedSearchTerm = searchTerm.trim().split(' ');

  const firstNameSearchTerm = splitedSearchTerm[0] || '';
  const lastNameSearchTerm = splitedSearchTerm[1] || splitedSearchTerm[0];

  const regexPattern = (term: string) => new RegExp(`.*${term}.*`, 'i');

  const users = await UserModel.find({
    $or: [
      {
        firstName: { $regex: regexPattern(firstNameSearchTerm) },
      },
      {
        lastName: { $regex: regexPattern(lastNameSearchTerm) },
      },
    ],
  }).select({
    isDeleted: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
    _id: 0,
    password: 0,
  });

  return users;
};

export default {
  searchUsersAndGroupsFromDB,
};
