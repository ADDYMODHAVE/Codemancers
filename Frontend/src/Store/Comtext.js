import React, { useEffect, useState } from "react";
import { UserApis } from "../apis/server-config";
import axios from "axios";
export const Context = React.createContext({});

const ContextProvider = (props) => {
  const [error, seterror] = useState("");
  const [item, setitem] = useState([]);
  const [user, setuser] = useState({});

  const loginUser = (userInfo) => {
    axios
      .post(UserApis.login, userInfo)
      .then((res) => {
        if (res.data.status === "Invalid password") {
          seterror("Invalid password");
        } else {
          const { admin, email, token } = res.data;
          localStorage.setItem("token", token);
          if (admin) {
            localStorage.setItem("admin", admin);
          }

          alert("Welcome");
          window.location.reload();
        }
      })
      .catch((e) => {
        seterror("Technical Error");
      });
  };
  const signUser = (userInfo) => {
    axios
      .post(UserApis.signup, userInfo)
      .then((res) => {
        if (res.data.status === "User Already Registered") {
          seterror("User Already Registered");
        } else {
          alert("login now");
        }
      })
      .catch((e) => {
        seterror("Technical Error");
      });
  };
  const addItem = (image) => {
    axios.post(UserApis.addItem, image, { headers: { token: UserApis.token } }).then((res) => {
      alert("Item added");
      getItem();
    });
  };
  const getItem = () => {
    axios
      .get(UserApis.getItem, {
        headers: {
          token: UserApis.token,
        },
      })
      .then((res) => {
        setitem(res.data.list);
      });
  };
  const removeItem = (id) => {
    axios
      .post(UserApis.removeItem, id, {
        headers: {
          token: UserApis.token,
        },
      })
      .then(() => {
        alert("Item removed");
        getItem();
      });
  };
  const getUser = () => {
    axios
      .get(UserApis.user, {
        headers: {
          token: UserApis.token,
        },
      })
      .then((res) => {
        setuser(res.data);
      });
  };
  const addToCart = (itemInf) => {
    axios
      .post(UserApis.addcart, itemInf, {
        headers: {
          token: UserApis.token,
        },
      })
      .then((res) => {
        getUser();
        alert("Item Added to cart");
      });
  };
  const remCart = (id) => {
    axios
      .post(UserApis.removeCart, id, {
        headers: {
          token: UserApis.token,
        },
      })
      .then(() => {
        alert("Item removed from cart");
        getUser();
      });
  };
  const chkOut = (address) => {
    axios
      .post(UserApis.cheackOut, address, {
        headers: {
          token: UserApis.token,
        },
      })
      .then(() => {
        alert("Success");
        getUser();
      });
  };

  useEffect(() => {
    getItem();
    getUser();
  }, []);

  const InitialState = { error, loginUser, signUser, addItem, item, removeItem, user, addToCart, remCart, chkOut };
  return <Context.Provider value={InitialState}>{props.children}</Context.Provider>;
};
export default ContextProvider;
