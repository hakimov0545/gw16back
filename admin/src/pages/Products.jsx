import { Button, Table } from "antd";
import getProducts from "../api/product";

function Products() {
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
  ];

  const { data, isLoading, error } = getProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log({ data });

  return (
    <div className="!py-10 !px-12">
      <div className="!flex !justify-between !items-center !mb-5">
        <h2 className="!text-2xl !font-bold">Products</h2>
        <Button>Add Product</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Products;
