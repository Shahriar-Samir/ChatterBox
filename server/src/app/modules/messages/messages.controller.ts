import catchAsync from '../../util/catchAsync';
import sendResponse from '../../util/sendResponse';
import messagesService from './messages.service';

const sendMessage = catchAsync(async (req, res) => {
  const result = await messagesService.createAMessageIntoDB(req.body);
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Message sent successfully',
    data: result,
  });
});

const removeAMessageForAll = catchAsync(async (req, res) => {
  const result = await messagesService.removeAMessageForAllIntoDB(
    req.params.MId,
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
    req.params.MId,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Message removed for sender successfully',
    data: result,
  });
});

export default {
  sendMessage,
  removeAMessageForAll,
  removeAMessageForSender,
};
