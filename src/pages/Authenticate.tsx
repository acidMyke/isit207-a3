const AuthenticationPagePath = '/(login|register)' as const;
export const AuthenticationPage = Object.assign(
  function () {
    return <div>AuthenticationPage</div>;
  },
  { path: AuthenticationPagePath },
);

export default AuthenticationPage;
