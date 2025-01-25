import { successResponse } from "../utils/index.js";

export const testController = async (req, res, next) => {
    return successResponse(res, "Hi world");
};
