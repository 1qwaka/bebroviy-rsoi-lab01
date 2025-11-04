import { RequestHandler } from "express";

export interface BaseHandler<
    Params = unknown,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = unknown,
    Locals extends Record<string, any> = Record<string, any>,
> extends RequestHandler<Params, ResBody, ReqBody, ReqQuery, Locals> { }