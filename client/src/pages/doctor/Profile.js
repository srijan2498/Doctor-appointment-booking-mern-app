import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Profile.css'

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const params = useParams();
  //get user profile Details
  const getAdminInfo = async () => {
    try {
      const res = await axios.get(
        `https://doctor-appointment-booking-mern-app.vercel.app/api/v1/admin/profile/${params.id}`
      );
      if (res.data.success) {
        setCurrentUser(res.data.data);
        setName(res.data.data.name)
        setEmail(res.data.data.email)
        setAddress(res.data.data.address)
        setPhone(res.data.data.phone)
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getAdminInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="table-container">
        <h1>Manage Profile</h1>
        {currentUser != null && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Field</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Name</td>
                <td>{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Email</td>
                <td>{email}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Phone</td>
                <td>{phone ? phone : "NA"}</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Address</td>
                <td>{address ? address : "NA"}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
