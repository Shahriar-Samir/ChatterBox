import catchAsync from '../../util/catchAsync';
import sendResponse from '../../util/sendResponse';
import searchService from './search.service';

const searchUsersAndGroups = catchAsync(async (req, res) => {
  const result = await searchService.searchUsersAndGroupsFromDB(
    req.query.searchTerm as string,
    req.query.uid as string,
  );
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'user and group data retrieved successfully',
    data: result,
  });
});

export default {
  searchUsersAndGroups,
};
