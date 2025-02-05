import catchAsync from '../../util/catchAsync';
import sendResponse from '../../util/sendResponse';
import conversationsService from './conversations.service';

const getAllUserConversation = catchAsync(async (req, res) => {
  const result = await conversationsService.getAllConversationsFromDB(
    req.params.uid,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'All user conversations retrieved successfully',
    data: result,
  });
});

const getSingleUserConversation = catchAsync(async (req, res) => {
  const result = await conversationsService.getSingleConversationsFromDB(
    req.params.cid,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'All user conversations retrieved successfully',
    data: result,
  });
});

const startANewConversation = catchAsync(async (req, res) => {
  const result = await conversationsService.createAConversationIntoDB(req.body);
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Conversation created successfully',
    data: result,
  });
});

const removedAConversation = catchAsync(async (req, res) => {
  const result = await conversationsService.removeAConversationFromDB(
    req.params.cid,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Conversation removed successfully',
    data: result,
  });
});

export default {
  startANewConversation,
  removedAConversation,
  getAllUserConversation,
  getSingleUserConversation,
};
