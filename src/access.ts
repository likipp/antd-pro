// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  console.log(currentUser, "当前用户")
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
