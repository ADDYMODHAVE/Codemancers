import React from "react";
import Header from "./Layout/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { Context } from "../Store/Comtext";
const Admin = () => {
  const ctx = useContext(Context);
  const GetUserLoginSignupInfo = (e) => {
    e.preventDefault();
    let Imageinfo = {
      image: e.target.image.value,
      title: e.target.title.value,
      discription: e.target.discription.value,
      price: +e.target.price.value,
    };
    e.target.image.value = "";
    e.target.title.value = "";
    e.target.discription.value = "";
    e.target.price.value = "";
    ctx.addItem(Imageinfo);
  };
  const onremoveHandler = (id) => {
    const idInfo = {
      _id: id._id,
    };
    ctx.removeItem(idInfo);
  };

  return (
    <>
      <Header />
      <div className="bg-warning rounded">
        <Form className="d-flex flex-column align-items-center text-center" onSubmit={GetUserLoginSignupInfo}>
          <h1>Admin</h1>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="discription" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image link</Form.Label>
            <Form.Control type="text" name="image" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" />
          </Form.Group>
          <Button variant="success" type="submit">
            ADD
          </Button>
        </Form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {ctx.item.map((it, index) => (
            <tr key={it._id}>
              <th scope="row">{index + 1}</th>
              <td>{it.title}</td>
              <td>{it.price}</td>
              <td>
                <button className="btn btn-danger" onClick={onremoveHandler.bind(this, it)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
