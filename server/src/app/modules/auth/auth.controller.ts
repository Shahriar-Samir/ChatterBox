import catchAsync from '../../util/catchAsync';
import sendResponse from '../../util/sendResponse';
import authService from './auth.service';

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'User logged in successfully',
    data: result,
  });
});

const logout = catchAsync(async (req, res) => {
  const result = await authService.logout(req.params.uid);
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'User logged out successfully',
    data: result,
  });
});

export default {
  login,
  logout,
};
