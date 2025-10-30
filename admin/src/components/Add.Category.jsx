import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { addCategory } from "../api/categories";

const AddCategoryModal = ({ id }) => {
	const mutation = addCategory();
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
				title="Add Category Modal"
				closable={{ "aria-label": "Custom Close Button" }}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<Form onFinish={onFinish} layout="vertical">
					<Form.Item
						label="Category Name"
						name="name"
						rules={[
							{
								required: true,
								message:
									"Please input category name!",
							},
						]}
					>
						<Input placeholder="Enter category name" />
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
export default AddCategoryModal;
