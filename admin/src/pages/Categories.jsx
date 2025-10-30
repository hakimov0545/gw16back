import { Button, Table } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCategory, getCategories } from "../api/categories";
import AddCategoryModal from "../components/Add.Category";
import EditCategoryModal from "../components/Edit.Category";

function Categories() {
	const mutation = deleteCategory();
	const navigate = useNavigate();
	const columns = [
		{
			title: "N",
			dataIndex: "_id",
			key: "_id",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "_id",
		},
		{
			title: "Actions",
			dataIndex: "_id",
			key: "_id",
			render: (id) => {
				return (
					<div className="flex gap-2">
						<EditCategoryModal id={id} />
						<Button
							type="primary"
							danger
							onClick={() => {
								mutation.mutate({ id });
							}}
						>
							Delete
						</Button>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/login");
		}
	}, []);

	const { data, isLoading, error } = getCategories();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="!py-10 !px-12">
			<div className="!flex !justify-between !items-center !mb-5">
				<h2 className="!text-2xl !font-bold">Categories</h2>
				<AddCategoryModal />
			</div>
			<Table columns={columns} dataSource={data} />
		</div>
	);
}

export default Categories;
