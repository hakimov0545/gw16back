import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { addProduct } from "../api/product";

const AddProductModal = ({ id }) => {
	const mutation = addProduct();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const onFinish = (values) => {
		mutation.mutate({ id, data: values });
		setIsModalOpen(false);
	};
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Add
			</Button>
			<Modal
				title="Add Product Modal"
				closable={{ "aria-label": "Custom Close Button" }}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<Form onFinish={onFinish} layout="vertical">
					<Form.Item
						label="Product Name"
						name="name"
						rules={[
							{
								required: true,
								message: "Please input product name!",
							},
						]}
					>
						<Input placeholder="Enter product name" />
					</Form.Item>
					<Form.Item
						label="Product price"
						name="price"
						rules={[
							{
								required: true,
								message:
									"Please input product price!",
							},
						]}
					>
						<Input placeholder="Enter product price" />
					</Form.Item>
					<Form.Item className="!text-right flex !gap-2 justify-end">
						<Button onClick={handleCancel}>Cancel</Button>
						<Button
							type="primary"
							htmlType="submit"
							className="!ml-2"
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default AddProductModal;
