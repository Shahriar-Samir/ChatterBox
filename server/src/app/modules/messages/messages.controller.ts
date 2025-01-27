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

export default {
  sendMessage,
};
