export default defineEventHandler(event => {
  return getCookie(event, "gh_token") ? true : false;
});
