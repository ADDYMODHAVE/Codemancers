const RootPath = {
  // path: "http://localhost:5000",
  path: document.location.origin,
};
export const UserApis = {
  signup: `${RootPath.path}/signup`,
  login: `${RootPath.path}/login`,
  addItem: `${RootPath.path}/additem`,
  getItem: `${RootPath.path}/getitem`,
  removeItem: `${RootPath.path}/removeitem`,
  token: localStorage.getItem("token"),
  addcart: `${RootPath.path}/addcart`,
  removeCart: `${RootPath.path}/remcart`,
  cheackOut: `${RootPath.path}/chkout`,
  user: `${RootPath.path}/getuser`,
};
