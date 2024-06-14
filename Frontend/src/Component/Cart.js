import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { Context } from "../Store/Comtext";
function Cart({ showcart }) {
  const ctx = useContext(Context);
  const [address, setaddress] = useState("");
  const oncheackout = () => {
    const chkoutinfo = {
      address,
    };
    if (address === "") {
      return;
    }
    ctx.chkOut(chkoutinfo);
  };

  const onremoveCart = (item) => {
    const itemInf = {
      _id: item._id,
    };
    ctx.remCart(itemInf);
  };

  return (
    <div className="modal mt-5" style={{ display: "block", position: "fixed" }}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {ctx.user.inf.cart.map((it, index) => (
                <tr key={it._id}>
                  <td>{index + 1}</td>
                  <td>{it.title}</td>
                  <td>{it.quantity}</td>
                  <td>{it.price}</td>
                  <td>
                    <button className="btn btn-danger" onClick={onremoveCart.bind(this, it)}>
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="fw-bolder">Total={ctx.user.inf.total}</div>
        </Modal.Body>
        {ctx.user.inf.cart.length > 0 && (
          <>
            <textarea
              className={`m-2 ${address === "" ? `border-danger` : ``}`}
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
              placeholder="Address"
              required
            />
          </>
        )}
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              showcart();
            }}
          >
            Close
          </Button>
          {ctx.user.inf.cart.length > 0 && (
            <Button
              variant="primary"
              onClick={() => {
                oncheackout();
              }}
            >
              Cheackout
            </Button>
          )}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Cart;
