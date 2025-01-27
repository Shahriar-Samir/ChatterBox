import catchAsync from '../../util/catchAsync';
import sendResponse from '../../util/sendResponse';
import usersService from './users.service';

const createUser = catchAsync(async (req, res) => {
  const result = await usersService.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    status: 201,
    message: 'User created successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await usersService.getSingleUserFromDB(req.params.uid);
  sendResponse(res, {
    success: true,
    status: 201,
    message: 'User data retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await usersService.updateUserInDB(req.body);
  sendResponse(res, {
    success: true,
    status: 201,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await usersService.deleteUserFromDB(req.params.uid);
  sendResponse(res, {
    success: true,
    status: 201,
    message: 'User Deleted successfully',
    data: result,
  });
});

export default {
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
