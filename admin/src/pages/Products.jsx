import { Button, Table } from "antd";
import { getProducts } from "../api/product";
import EditProductModal from "../components/Edit.Product";
import AddProductModal from "../components/Add.Product";
import { deleteProduct } from "../api/product";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
	const mutation = deleteProduct();
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
			title: "Price",
			dataIndex: "price",
			key: "_id",
		},
		{
			title: "Actions",
			dataIndex: "_id",
			key: "_id",
			render: (id) => {
				return (
					<div className="flex gap-2">
						<EditProductModal id={id} />
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

	const { data, isLoading, error } = getProducts();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="!py-10 !px-12">
			<div className="!flex !justify-between !items-center !mb-5">
				<h2 className="!text-2xl !font-bold">Products</h2>
				<AddProductModal />
			</div>
			<Table columns={columns} dataSource={data} />
		</div>
	);
}

export default Products;
