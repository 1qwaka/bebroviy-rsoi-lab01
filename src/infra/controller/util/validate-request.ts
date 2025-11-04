import { RequestHandler, Request, Response, NextFunction } from "express";
import { z, ZodNever, ZodType, ZodUnknown } from "zod";

export function validateRequest<
    B extends ZodType = ZodUnknown, 
    P extends ZodType = ZodUnknown,
    Q extends ZodType = ZodUnknown
>
(
    schemas: { body?: B; params?: P, query?: Q }
): RequestHandler<
    z.infer<P>,
    unknown,
    z.infer<B>,
    z.infer<Q>
> {
    return (
        req: Request<z.infer<P>, any, z.infer<B>, z.infer<Q>>, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            } 
            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            } 
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            next();
        } catch (e: unknown) {
            if (e instanceof z.ZodError) {
                res.status(400).json({
                    message: 'Validation error',
                    errors: e.issues.reduce((err, issue) => {
                        err[issue.path.join('.')] = issue.message;
                        return err;
                    }, {} as Record<string, string>)
                });
            }
            next(e);
        }
    };
}
