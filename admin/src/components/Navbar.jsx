import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	function logout() {
		localStorage.removeItem("token");
		navigate("/login");
	}

	return (
		<nav className="flex justify-between items-center">
			<ul>
				<li>
					<Link to={"/products"}>Products</Link>
				</li>
				<li>
					<Link to={"/categories"}>Categories</Link>
				</li>
				<li>
					<Link to={"/orders"}>Orders</Link>
				</li>
			</ul>
			<Button onClick={logout}>Logout</Button>
		</nav>
	);
}

export default Navbar;
