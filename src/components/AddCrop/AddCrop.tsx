import { Button, Form, Input } from "antd";
import styled from "styled-components";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { CropValidation } from "../CropValidation/CropValidation";

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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [remark, setRemark] = useState("");

  const host = process.env.REACT_APP_LIVE;

  const data = {
    name: name,
    description: description,
    quantity: quantity,
    price: price,
    remark: remark,
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    axios
      // .post("http://localhost:3006/crops", data)
      // .post(
      //   "https://my-json-server.typicode.com/ArriannePandaraoan/json_db/crops",
      //   data
      // )
      .post(host + `${"/add-crop"}`, data);
    // .then((response: AxiosResponse<any>) => {
    // .then((response) => {
    nav(-1);
    // });
  }

  const addCropValidation = async (e: any) => {
    e.preventDefault();
    let cropData = {
      name: e.target[0].value,
      description: e.target[1].value,
      quantity: e.target[2].value,
      price: e.target[3].value,
      remark: e.target[4].value,
    };
    const isValid = await CropValidation.isValid(cropData);
    console.log(isValid);
  };

  return (
    <StyledContainer>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={(values) => addCropValidation(values)}
      >
        <Form.Item
          label="Crop"
          name="name"
          rules={[{ required: true, message: "Please input crop" }]}
        >
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="e.g. Corn"
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
        >
          <Input.TextArea
            showCount
            placeholder="e.g. Crop Rotation 2019 to 2021"
            maxLength={100}
            style={{
              borderRadius: "50px",
              width: "300px",
              cursor: "pointer",
            }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </Form.Item>

        <Form.Item
          label="Seeds - Plants per Acre:"
          name="quantity"
          rules={[{ required: true, message: "Please input qty" }]}
        >
          <Input
            style={{
              borderRadius: "50px",
              width: "300px",
              cursor: "pointer",
            }}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            value={quantity}
            placeholder="e.g. 20000"
          />
        </Form.Item>

        <Form.Item
          label="Seeds - price per Acre:"
          name="price"
          rules={[{ required: true, message: "Please input price" }]}
        >
          <Input
            style={{
              borderRadius: "50px",
              width: "300px",
              cursor: "pointer",
            }}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            value={price}
            placeholder="e.g. 7000.99"
          />
        </Form.Item>

        <Form.Item label="Remarks" name="remarks">
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
              style={{ borderRadius: "50px", backgroundColor: "#1C8E81" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form.Item>
        </StyledButton>
      </Form>
    </StyledContainer>
  );
};

export default Component;
