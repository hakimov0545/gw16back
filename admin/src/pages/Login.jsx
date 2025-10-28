import React from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: async (data) => {
			const res = await axios.post(
				"http://localhost:4444/auth/login",
				data
			);
			return res;
		},
		onSuccess: (res) => {
			localStorage.setItem("token", res.data.token);
		},
	});

	const onFinish = (values) => {
		mutation.mutate(values);
		navigate("/products");
	};

	useEffect(() => {
		if (localStorage.getItem("token")) {
			navigate("/products");
		}
	}, []);

	return (
		<div>
			<h2>Login Page</h2>

			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: "Please input your email!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item label={null}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Login;
