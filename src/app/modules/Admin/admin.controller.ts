import catchAsync from "../../utils/catchAsync";
import pickValidFields from "../../utils/pickValidFields";
import sendResponse from "../../utils/sendResponse";
import { AdministratorValidFields } from "./admin.constant";
import { createAdministratorService, deleteAdministratorService, getAdministratorsService, getSingleAdministratorService, updateAccessService, updateAdministratorService } from "./admin.service";


const createAdministrator = catchAsync(async (req, res) => {
  const result = await createAdministratorService(req, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Administrator is created successfully",
    data: result,
  });
});


const updateAccess = catchAsync(async (req, res) => {
  const { administratorId } = req.params;
  const { access } = req.body;
  const result = await updateAccessService(administratorId, access);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Administrator is updated successfully",
    data: result,
  });
});


const updateAdministrator = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await updateAdministratorService(userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Administrator is updated successfully",
    data: result,
  });
});


const getAdministrators = catchAsync(async (req, res) => {
  const validatedQuery = pickValidFields(req.query, AdministratorValidFields);
  const result = await getAdministratorsService(validatedQuery);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Administrators are retrieved successfully",
    meta: result.meta,
    data: result.data
  });
});


const deleteAdministrator = catchAsync(async (req, res) => {
  const { administratorId } = req.params;
  const result = await deleteAdministratorService(administratorId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Administrator is deleted successfully",
    data: result,
  });
});


const getSingleAdministrator = catchAsync(async (req, res) => {
  const { administratorId } = req.params;
  const result = await getSingleAdministratorService(administratorId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Administrator is retrieved successfully",
    data: result,
  });
});

const AdministratorController = {
    createAdministrator,
    updateAccess,
    updateAdministrator,
    getAdministrators,
    deleteAdministrator,
    getSingleAdministrator
};
  
export default AdministratorController;