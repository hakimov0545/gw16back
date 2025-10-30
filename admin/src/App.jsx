import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Categories from "./pages/Categories";

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/products" element={<Products />} />
				<Route path="/login" element={<Login />} />
				<Route path="/categories" element={<Categories />} />
			</Routes>
		</div>
	);
}

export default App;
