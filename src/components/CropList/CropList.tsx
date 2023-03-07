import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

const StyledContainer = styled.div`
  overflow: hidden !important;
  margin: 10% 10% 5% 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-flow: row wrap;
`;

const StyledContainerTable = styled.div`
  overflow: hidden !important;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const StyledDiv = styled.div`
  padding: 10px;
`;

const { Column, ColumnGroup } = Table;

interface DataType {
  key?: React.Key;
  id?: number;
  name?: string;
  description?: any;
  quantity?: number;
  remark?: any;
  price?: number;
  crops?: any;
  title?: string;
  dataIndex?: string;
  width?: any;
}

const Component = () => {
  const [crops, setCrops] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  let [filteredCrop] = useState<any>();

  const navigate: any = useNavigate();

  const host = process.env.REACT_APP_LIVE;
  const tst = process.env.REACT_APP_API;

  function getCrops() {
    // axios.get("http://localhost:3006/crops").then((response) => {
    // axios
    //   .get(
    //     "https://my-json-server.typicode.com/ArriannePandaraoan/json_db/crops"
    //   )
    //   .then((res) => {
    // setCrops(res.data.reverse());
    // axios.get("http://52.221.206.2/crops").then((response) => {
    axios.get(tst + `${"/crops"}`).then((response) => {
      setCrops(
        response.data
          .reverse()
          .map(
            (crop: {
              remark: any;
              quantity: any;
              name: any;
              description: any;
              id: any;
              price: any;
            }) => ({
              name: crop.name,
              description: crop.description,
              quantity: crop.quantity.toLocaleString(),
              price: `₱ ${Number(crop.price)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
              remark: crop.remark,
              id: crop.id,
            })
          )
      );
    });
  }

  useEffect(() => {
    getCrops();
  }, []);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setData(filteredCrop);
    return await axios
      // .get(`http://localhost:3006/crops?q=${value}`)
      .get(
        `https://my-json-server.typicode.com/ArriannePandaraoan/json_db/crops?q=${value}`
      )
      .then((res) => {
        setData(res.data);
        setValue("");
      })

      .catch((err) => console.log(err));
  };

  console.log("crop", data);

  // useEffect(() => {
  //   axios.get("http://localhost:3006/crops").then((res) => {
  //     // setCrops(res.data);
  //     setCrops(
  //       res.data
  //         .reverse()
  //         .map(
  //           (crop: {
  //             remark: any;
  //             quantity: any;
  //             name: any;
  //             description: any;
  //             id: any;
  //             price: any;
  //           }) => ({
  //             name: crop.name,
  //             description: crop.description,
  //             quantity: crop.quantity.tolocaleString(),
  //             price: crop.price,
  //             remark: crop.remark,
  //             id: crop.id,
  //           })
  //         )
  //     );
  //     console.log(crops);
  //   });
  // }, []);

  function nav(id: any) {
    navigate("/update-crop", { state: { id: id } });
  }

  function deleteList(id: any) {
    console.log("deleted item", id);
    axios
      // .delete(`http://localhost:3006/crops/${id}`)
      .delete(tst + `${"/delete-crop/"}${id}`)
      .then((resp: AxiosResponse<any>) => {
        getCrops();
      });
  }

  function searchTable(rows: any) {
    return rows.filter(
      (row: any) => row.name.toLowerCase().indexOf(value) > -1
    );
  }

  return (
    <>
      <StyledContainer>
        <StyledDiv>
          <Link to="/add-crop">
            <Button
              shape="round"
              style={{
                backgroundColor: "#1C8E81",
                color: "white",
                border: "none",
                fontWeight: "bold",
              }}
              size="middle"
              icon={<PlusOutlined />}
            >
              Add New Crop
            </Button>
          </Link>
        </StyledDiv>
        <StyledDiv>
          {/* <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleSearch}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          > */}
          <Input
            placeholder="Search Crop. . ."
            style={{
              borderRadius: "50px",
              width: "300px",
              cursor: "pointer",
            }}
            size="middle"
            suffix={<SearchOutlined />}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={handleSearch}
          />
          {/* </Form> */}
        </StyledDiv>
      </StyledContainer>

      <StyledContainerTable>
        <Table dataSource={searchTable(crops)} pagination={{ pageSize: 4 }}>
          <>
            <Column
              title="Crop (Name)"
              dataIndex="name"
              key="id"
              width="150px"
            />
            {console.log("crop name: ", value)}
            <Column
              title="Description"
              dataIndex="description"
              key="id"
              width="200px"
            />
            <ColumnGroup title="Seeds">
              <Column
                title="quantity: Plants per Acre (Quantity)"
                dataIndex="quantity"
                key="id"
                width="200px"
              />
              <Column
                title="price per Acre (₱)"
                dataIndex="price"
                key="id"
                width="150px"
              />
            </ColumnGroup>
            <Column title="Remarks" dataIndex="remark" key="id" width="250px" />
            <Column
              title="Action"
              key="action"
              render={(_: any, record: DataType) => (
                <Space size="middle">
                  <Button
                    shape="round"
                    style={{
                      backgroundColor: "#5083B1",
                      color: "white",
                      border: "none",
                      fontWeight: "bold",
                    }}
                    size="small"
                    onClick={() => nav(record.id)}
                  >
                    Update
                  </Button>
                  <Button
                    shape="round"
                    style={{
                      backgroundColor: "#DFD0D0",
                      color: "black",
                      border: "none",
                      fontWeight: "bold",
                    }}
                    size="small"
                    onClick={() => deleteList(record.id)}
                  >
                    Delete
                  </Button>
                </Space>
              )}
            />
          </>
        </Table>
      </StyledContainerTable>
      {console.log("test", crops)}
    </>
  );
};
export default Component;
