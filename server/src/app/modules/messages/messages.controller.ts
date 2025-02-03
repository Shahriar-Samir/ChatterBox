import catchAsync from '../../util/catchAsync';
import sendResponse from '../../util/sendResponse';
import messagesService from './messages.service';

const getAllConversationMessages = catchAsync(async (req, res) => {
  const result = await messagesService.getAllConversationMessages(
    req.params.cid,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'All conversations messages retrieved successfully',
    data: result,
  });
});

const sendMessage = catchAsync(async (req, res) => {
  const result = await messagesService.createAMessageIntoDB(req.body);
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Message sent successfully',
    data: result,
  });
});

const editAMessage = catchAsync(async (req, res) => {
  const result = await messagesService.updateAMessageIntoDB(
    req.params.mid,
    req.body,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Message edited successfully',
    data: result,
  });
});

const removeAMessageForAll = catchAsync(async (req, res) => {
  const result = await messagesService.removeAMessageForAllIntoDB(
    req.params.mid,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Message removed for all successfully',
    data: result,
  });
});

const removeAMessageForSender = catchAsync(async (req, res) => {
  const result = await messagesService.removeAMessageForSenderIntoDB(
    req.params.mid,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Message removed for sender successfully',
    data: result,
  });
});

export default {
  getAllConversationMessages,
  sendMessage,
  removeAMessageForAll,
  removeAMessageForSender,
  editAMessage,
};
