import type { EventHandler, EventHandlerRequest, H3Event } from "h3";

export const defineGithubAuthEventHandler = <T extends EventHandlerRequest, D>(
  handler: (event: H3Event<T>, gh_token: string) => Promise<D>
): EventHandler<T, Promise<D>> =>
  defineEventHandler<T>(async (event) => {
    try {
      // do something before the route handler

      /* check if user is loggedin with github */
      const token = getCookie(event, "gh_token");
      if (!token) {
        throw createError({
          statusCode: 401,
          statusMessage: "Unauthorized",
        });
      }

      const response = await handler(event, token);
      // do something after the route handler
      return response;
    } catch (err) {
      // Error handling
      return err;
    }
  });

export const defineSafeGithubAuthEventHandler = <T extends EventHandlerRequest, D>(
  handler: (event: H3Event<T>, gh_token: string | undefined) => Promise<D>
): EventHandler<T, Promise<D>> =>
  defineEventHandler<T>(async (event) => {
    try {
      // do something before the route handler
      const response = await handler(event, getCookie(event, "gh_token"));
      // do something after the route handler
      return response;
    } catch (err) {
      // Error handling
      return err;
    }
  });
