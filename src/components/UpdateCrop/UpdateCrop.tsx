import { Button, Form, Input } from "antd";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import axios, { AxiosResponse } from "axios";

const StyledContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-left: -5%;
  margin-top: 10%;
`;

const StyledButton = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-left: 10%;
`;

const Component = () => {
  const nav = useNavigate();

  const location = useLocation();
  console.log("g", location);

  const loc = location.state as any;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [remark, setRemark] = useState("");

  const { id } = useParams();

  const [form] = Form.useForm();

  const host = process.env.REACT_APP_LIVE;
  const local = process.env.REACT_APP_API;

  const data = {
    name: name,
    description: description,
    quantity: quantity,
    price: price,
    remark: remark,
  };

  useEffect(() => {
    // axios.get(`http://localhost:3006/crops/${loc.id}`).then((res) => {
    axios.get(host + `${"/crops/"}${loc.id}`).then((res) => {
      // axios.get(`http://18.139.83.109:4000/crops/${loc.id}`).then((res) => {
      console.log("inside form: ", res);
      setName(res.data.name);
      setDescription(res.data.description);
      setQuantity(res.data.quantity);
      setPrice(res.data.price);
      setRemark(res.data.remark);
    });
  }, []);

  function updateCrop(id: any) {
    // e.preventDefault();
    // axios.put(`http://localhost:3006/crops/${id}`, data);
    // axios.put(`http://18.139.83.109:4000/crops/${id}`, data);
    axios.put(host + `${"/update-crop/"}${id}`, data);
    // .then((resp: AxiosResponse<any>) => {
    nav(-1);
    // });
  }

  console.log("data in form: ", data);

  return (
    <StyledContainer>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={{ remember: true }}
        initialValues={{
          name: data ? data.name : "x",
        }}
        // onFinish={handleSubmit}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Crop"
          name="name"
          rules={[
            {
              required: false,
              message: "Please input crop",
            },
          ]}
          // initialValue={name}
          // initialValue={{
          //   name: data ? data.name : "XX",
          // }}
        >
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            style={{
              borderRadius: "50px",
              width: "300px",
              cursor: "pointer",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description" }]}
          // initialValue={description}
        >
          <Input.TextArea
            showCount
            maxLength={100}
            style={{
              borderRadius: "50px",
              width: "300px",
              cursor: "pointer",
            }}
            onChange={(e) => setDescription(e.target.value)}
            // value={description}
          />
        </Form.Item>

        <Form.Item
          label="Seeds - Plants per Acre:"
          name={quantity}
          rules={[{ required: true, message: "Please input qty" }]}
          initialValue={quantity}
        >
          <Input
            style={{
              borderRadius: "50px",
              width: "300px",
              cursor: "pointer",
            }}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            // value={quantity}
          />
        </Form.Item>

        <Form.Item
          label="Seeds - price per Acre:"
          name={price}
          rules={[{ required: true, message: "Please input price" }]}
          initialValue={price}
        >
          <Input
            style={{
              borderRadius: "50px",
              width: "300px",
              cursor: "pointer",
            }}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            // value={price}
          />
        </Form.Item>

        <Form.Item label="Remarks" name={remark} initialValue={remark}>
          <Input.TextArea
            showCount
            maxLength={100}
            style={{
              borderRadius: "50px",
              width: "300px",
              cursor: "pointer",
            }}
            onChange={(e) => setRemark(e.target.value)}
            value={remark}
          />
        </Form.Item>

        <StyledButton>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ borderRadius: "50px", backgroundColor: "#5083B1" }}
              onClick={() => updateCrop(loc.id)}
            >
              Update Crop
            </Button>
          </Form.Item>
        </StyledButton>
      </Form>
    </StyledContainer>
  );
};
export default Component;
