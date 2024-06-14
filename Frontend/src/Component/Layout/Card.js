import React from "react";

const Card = ({ price, title, discription, image, onaddToCart }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h5 className="card-title">Rs{price}</h5>
        <p className="card-text">{discription}</p>
        <button className="btn btn-primary" onClick={onaddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
