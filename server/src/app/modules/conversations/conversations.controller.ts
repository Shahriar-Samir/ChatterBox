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

const updateGroupConversation = catchAsync(async (req, res) => {
  const result = await conversationsService.updateGroupConversation(
    req.query.cid as string,
    req.query.groupName as string,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Group data update successfully',
    data: null,
  });
});

const addNewParticipantToGroup = catchAsync(async (req, res) => {
  await conversationsService.addParticipantInGroupConversation(
    req.query?.cid as string,
    req.body,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'A new member added successfully',
    data: null,
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

const updateMIDofConversation = catchAsync(async (req, res) => {
  const result = await conversationsService.updateLastMessageIdOfConversation(
    req.query.CID as string,
    req.query.MId as string,
    req.query.receiverId as string,
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Conversation MId updated successfully',
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
const removedAParticipantFromConversation = catchAsync(async (req, res) => {
  const result =
    await conversationsService.removeParticipantFromGroupConversation(
      req.query.cid as string,
      req.query.uid as string,
    );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Group participant removed successfully',
    data: null,
  });
});
const leaveFromAGroupConversation = catchAsync(async (req, res) => {
  const result = await conversationsService.leaveGroupConversation(
    req.query.cid as string,
    req.query.uid as string,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Leaved from group successfully',
    data: null,
  });
});

export default {
  startANewConversation,
  addNewParticipantToGroup,
  updateGroupConversation,
  removedAConversation,
  getAllUserConversation,
  getSingleUserConversation,
  updateMIDofConversation,
  removedAParticipantFromConversation,
  leaveFromAGroupConversation,
};
