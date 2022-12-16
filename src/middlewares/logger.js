import { debugLogger } from "../utils/index.js"

export const logger = (req,res,next )=>{
    req.logger = debugLogger
    next()
}