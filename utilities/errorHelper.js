export const errHandler = ({statusCode, message}) =>{
    let err = new Error(message);
    err.statusCode = statusCode;
    throw err;
};


export const ERR_CONST = {
    "VENDOR_NAME_UNDEFINED": {statusCode: 422 , message: "vendorName not defined."},
    "VENDOR_SLUG_UNDEFINED": {statusCode: 422 , message: "vendorSlug not defined."},
    "UNABLE_TO_CREATE_USER": {statusCode: 422 , message: "Unable to create user."},
    "INVALID_USERNAME_OR_PASSWORD": {statusCode: 422 , message: "Invalid username or password"},
    "INVALID_IMG_URL": {statusCode: 422 , message: "Invalid Image url"},
    "UNAUTHORIZED_VENDOR_REQUEST": {statusCode: 422 , message: "Unauthorized vendor request"},
    "MISSING_VENDOR_ID": {statusCode: 422 , message: "vendorId required"}

};

