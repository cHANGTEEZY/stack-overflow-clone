const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  ASK_QUESTION: "/ask-question",
  PROFILE: (id: string) => `/profile/${id}`,
  TAGS: (id: string) => `/tags/${id}`,
  QUESTION: (id: string) => `/question/${id}`,
  TAG: (id: string) => `/tags/${id}`,
  SIGN_IN_WITH_OAUTH: "signin-with-oauth",
};

export default ROUTES;
