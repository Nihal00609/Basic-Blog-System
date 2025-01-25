export const successResponse = async (
    res,
    message = "Action performed",
    data = {}
) => {
    return res.status(200).send({ status: true, message, data });
};

export const errorResponse = async (
    res,
    message = "Action not performed",
    data = {}
) => {
    return res.status(200).send({ status: false, message, data });
};
