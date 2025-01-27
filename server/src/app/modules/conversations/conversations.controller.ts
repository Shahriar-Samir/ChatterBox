import catchAsync from '../../util/catchAsync';
import sendResponse from '../../util/sendResponse';
import conversationsService from './conversations.service';

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
  const result = await conversationsService.removeAConversationFromDB(req.body);
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Conversation deleted successfully',
    data: result,
  });
});

export default {
  startANewConversation,
  removedAConversation,
};
