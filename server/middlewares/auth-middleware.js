const ApiError = require('../exseptions/api-error')
const tokenService = require('../service/token-service');
module.exports = function (req, res, next) {
    try {
        const authoriztionHeader = req.headers.authorization;

        if (!authoriztionHeader) {
            
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authoriztionHeader.split(' ') [1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {

            console.log("тут"+accessToken +  userData)
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();

    } catch (e) {
      
        return next(ApiError.UnauthorizedError());
    }
}