const config = useRuntimeConfig();

export default defineEventHandler(async event => {
  const { code } = getQuery(event);

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing code",
    });
  }

  const response: any = await $fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: {
      client_id: config.public.GITHUB_CLIENT_ID,
      client_secret: config.GITHUB_CLIENT_SECRET,
      code,
    },
  });

  if (response.error) {
    throw createError({
      statusCode: 500,
      statusMessage: response.error,
    });
  }

  setCookie(event, "gh_token", response.access_token, { path: "/", httpOnly: true });

  return sendRedirect(event, "/");
});
