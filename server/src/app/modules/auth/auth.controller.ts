import catchAsync from '../../util/catchAsync';
import sendResponse, {
  sendResponseRemovingCookies,
  sendResponseSettingCookies,
} from '../../util/sendResponse';
import authService from './auth.service';

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  sendResponseSettingCookies(res, {
    success: true,
    status: 200,
    message: 'User logged in successfully',
    data: result,
  });
});

const userAuth = catchAsync(async (req, res) => {
  const result = req.user as any;
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'User authorized successfully',
    data: result,
  });
});
const logout = catchAsync(async (req, res) => {
  sendResponseRemovingCookies(res, {
    success: true,
    status: 200,
    message: 'User logged out successfully',
  });
});

export default {
  login,
  logout,
  userAuth,
};
