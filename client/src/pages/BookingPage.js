import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Button } from "antd";
import { Table } from "antd";
import moment from "moment";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const getBookingsData = async () => {
    try {
      const res = await axios.get("https://doctor-appointment-booking-mern-app.vercel.app/api/v1/admin/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (error) {
    }
  }

  const changeStatus = async (obj) => {
    try {
      const res = await axios.post("https://doctor-appointment-booking-mern-app.vercel.app/api/v1/admin/change-appointment-status", obj);
      if (res.data.success) {
        getBookingsData()
      }
    } catch (error) {
    }
  }

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User Id",
      dataIndex: "userId"
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      render: (text, record) => (
        <span>
          {`${record.patientName.charAt(0).toUpperCase()}${record.patientName.slice(1)}`}
        </span>
      ),
      key: "patientName"
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Treatment",
      dataIndex: "service",
      key: "service",
      render: (text, record) => (
        <span>
          {record.service.replace(/([a-z])([A-Z])/g, '$1 $2')}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span>
          {`${record.status.charAt(0).toUpperCase()}${record.status.slice(1)}`}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: `_id+email`,
      render: (text, record) => {
        const obj = {
          bookingId: record._id,
          userEmail: record.email,
          userId:record.userId
        }
        return <Button style={{ backgroundColor: "#00337C", color: "#fff", width: "100px", opacity: record.status === "pending" ? 1 : 0.7 }} disabled={record.status === "pending" ? false : true} onClick={() => changeStatus(obj)}>Complete
        </Button>
      },
    },
  ];

  useEffect(() => {
    getBookingsData();
  }, []);

  const pagination = {
    pageSize: 10,
    showTotal: (total) => `Total ${total} items`,
  };
  return (
    <Layout>
      <div className="appointments-table">
        <h1>Bookings Lists</h1>
        <Table scroll={{ x: 1200 }} columns={columns} dataSource={bookings} pagination={pagination} />
      </div>
    </Layout>
  );
};

export default BookingPage;
