import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { editCategory } from "../api/categories";
const EditCategoryModal = ({ id }) => {
	const mutation = editCategory();
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
				Edit
			</Button>
			<Modal
				title="Edit Category Modal"
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
									"Please input Category name!",
							},
						]}
					>
						<Input placeholder="Enter Category name" />
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
export default EditCategoryModal;
