import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Table } from "antd";
import './Appointments.css'

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("https://doctor-appointment-booking-mern-app.vercel.app/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      render: (text, record) => (
        <span>
          {`${record.patientName.charAt(0).toUpperCase()}${record.patientName.slice(1)}`}
        </span>
      ),
    },
    {
      title: "Treatment",
      dataIndex: "service",
      render: (text, record) => (
        <span>
          {record.service.replace(/([a-z])([A-Z])/g, '$1 $2')}
        </span>
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      render: (text, record) => (
        <span>
          {record.time}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span style={{ backgroundColor: `${record.status === "Complete" ? "green" : "red"}`, display: "inline-block", textAlign: "center", width: "80px", color: "#fff" }}>
          {record.status === "Complete" ?"Completed":"Pending"}
        </span>
      ),
    },
  ];

  const pagination = {
    pageSize: 10,
    showTotal: (total) => `Total ${total} items`,
  };

  return (
    <Layout>
      <div className="appointments-table">
        <h1>Appointments Lists</h1>
        <Table columns={columns} dataSource={appointments} pagination={pagination} />
      </div>
    </Layout>
  );
};

export default Appointments;
