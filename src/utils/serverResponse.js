export class ServerResponse {
    static HTTP_STATUS = {
        SUCCESS: {code:200, msg:'Success'},
        UNAUTHORIZED: { code: 401, message: "Unauthorized" },
        BAD_REQUEST: { code: 400, message: "Bad Request" },
        NOT_FOUND: {code:404, msg:'Not Found'},
        INTERNAL_ERROR: {code:500, msg:'Internal Server Error'}
    }

    static success({req, res, data}){
        req.logger.info(`PATH:${req.originalUrl} - METHOD:${req.method}`)
        return res.status(ServerResponse.HTTP_STATUS.SUCCESS.code).json({
            status:ServerResponse.HTTP_STATUS.SUCCESS.code,
            msg: ServerResponse.HTTP_STATUS.SUCCESS.msg,
            data
        })
    }
    static unauthorized({req, res, error }) {
        req.logger.error(`PATH:${req.originalUrl} - METHOD:${req.method} - ERROR:${error}`)
        return res.status(ServerResponse.HTTP_STATUS.UNAUTHORIZED.code).json({
          status: ServerResponse.HTTP_STATUS.UNAUTHORIZED.code,
          message: ServerResponse.HTTP_STATUS.UNAUTHORIZED.message,
          error
        });
    }
    static badRequest({req, res, error }) {
        req.logger.error(`PATH:${req.originalUrl} - METHOD:${req.method} - ERROR:${error}`)
        return res.status(ServerResponse.HTTP_STATUS.BAD_REQUEST.code).json({
          status: ServerResponse.HTTP_STATUS.BAD_REQUEST.code,
          message: ServerResponse.HTTP_STATUS.BAD_REQUEST.message,
          error
        });
    }
    static notFound({req, res, error}){
        req.logger.warn(`PATH:${req.originalUrl} - METHOD:${req.method} - ERROR:${error}`)
        return res.status(ServerResponse.HTTP_STATUS.NOT_FOUND.code).json({
            status:ServerResponse.HTTP_STATUS.NOT_FOUND.code,
            msg: ServerResponse.HTTP_STATUS.NOT_FOUND.msg,
            error
        })
    }
    static internalError({req, res, error}){
        req.logger.error(`PATH:${req.originalUrl} - METHOD:${req.method} - ERROR:${error}`)
        return res.status(ServerResponse.HTTP_STATUS.INTERNAL_ERROR.code).json({
            status:ServerResponse.HTTP_STATUS.INTERNAL_ERROR.code,
            msg: ServerResponse.HTTP_STATUS.INTERNAL_ERROR.msg,
            error
        })
    }
}