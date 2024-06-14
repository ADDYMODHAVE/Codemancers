import React, { useState } from "react";
import Header from "./Layout/Header";
import Cart from "./Cart";
import Card from "./Layout/Card";
import { useContext } from "react";
import { Context } from "../Store/Comtext";
const Home = (props) => {
  const ctx = useContext(Context);
  const [cart, setcart] = useState(false);
  const showcart = () => {
    setcart(!cart);
  };
  const onaddToCart = (item) => {
    ctx.addToCart(item);
  };
  return (
    <>
      <Header showcart={showcart} />
      {cart && <Cart showcart={showcart} />}
      <div className="container text-center">
        <div className="row">
          {ctx.item.map((it) => (
            <div className="col">
              <Card price={it.price} discription={it.discription} title={it.title} image={it.image} key={it._id} onaddToCart={onaddToCart.bind(this, it)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
