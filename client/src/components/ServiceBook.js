import React, { useState } from 'react'
import { Col, Form, Input, Row, TimePicker, message, Select } from "antd";
import './ServiceBook.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
const { ObjectId } = require('bson');

const ServiceBook = () => {
    const { user } = useSelector((state) => state.user);
    const [userId, setUserId]=useState(user?user._id:"")
    function generateObjectId() {
        const timestamp = Math.floor(new Date().getTime() / 1000).toString(16); // 8 chars for the timestamp
        const randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join(''); // 16 chars of random hex
        return timestamp + randomHex;
    }
    const handleBooking = async (values) => {
        values.userId = user ? user._id : generateObjectId()
        try {
            if (values.name.length != 0 && values.phone.length != 0 && values.service.length != 0 && values.email.length != 0) {
                console.log(values)
                if (values.phone.length === 10) {
                    const res = await axios.post("/api/v1/user/book-appointment", values);
                    console.log("hi")
                    console.log(res)
                    window.location.reload();
                    if (res.data.success) {
                        message.success("Your appointment has been booked.")
                    }
                } else {
                    message.error("Phone number should be a 10 digit number.")
                }
            } else {
                message.error("Please fill all requires fields.")
            }

        } catch (error) {

        }
    }
    const { Option } = Select;
    const options = [
        { label: 'Wet Cupping', value: 'WetCupping' },
        { label: 'Dry Cupping', value: 'DryCupping' },
        { label: 'Bamboo Cupping', value: 'BambooCupping' },
        { label: 'Fire Cupping', value: 'FireCupping' },
        { label: 'EMS', value: 'EMS' },
    ];
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            +91
        </Form.Item>
    );
    return (
        <div id='bookAppointment'>
            <h1 className="text-center">Book Appointment</h1>
            <Form layout="vertical" onFinish={handleBooking} className="m-3">
                <Row gutter={20}>
                    <Col xs={24} md={12} lg={12}>
                        <Form.Item
                            label="User Id"
                            name="userId"
                        >
                            <Input defaultValue={userId} type="text" placeholder="your user id" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input type="text" placeholder="your name" required />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{ required: true }]}
                        >
                            <Input type='number' required addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="XXXXXXXXXX" min={10} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                        <Form.Item label="Service" name="service" required
                            rules={[{ required: true }]}>
                            <Select defaultValue="Select Service" style={{ width: "100%" }} >
                                {options.map(option => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type="email" placeholder="your email address" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                        <Form.Item
                            label="Address"
                            name="address"
                        >
                            <Input type="text" placeholder="your address" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                        <button id='submit-btn' className="btn btn-primary form-btn" type="submit" onClick={handleBooking}>
                            Submit
                        </button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ServiceBook
