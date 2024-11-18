import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table } from "antd";
import './User.css'
const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("https://doctor-appointment-booking-mern-app.vercel.app/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "User Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {`${record.name.charAt(0).toUpperCase()}${record.name.slice(1)}`}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => (
        <span>
          {`${record.phone?record.phone:"NA"}`}
        </span>
      ),
    }
  ];

  const pagination = {
    pageSize: 10,
    showTotal: (total) => `Total ${total} items`,
  };

  return (
    <Layout>
      <div className="user-container">
        <h1 className="text-center m-2">Users List</h1>
        <Table scroll={{ x: 800 }} columns={columns} dataSource={users} pagination={pagination} />
      </div>
    </Layout>
  );
};

export default Users;
