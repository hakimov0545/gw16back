import {
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

export const getProducts = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await axios.get(
				"http://localhost:4444/products"
			);
			return res.data;
		},
	});

	return { data, isLoading, error };
};

export const editProduct = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ id, data }) => {
			const res = await axios.patch(
				`http://localhost:4444/products/${id}`,
				data
			);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});

	return mutation;
};

export const addProduct = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ data }) => {
			const res = await axios.post(
				`http://localhost:4444/products`,
				data
			);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});

	return mutation;
};

export const deleteProduct = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ id }) => {
			const res = await axios.delete(
				`http://localhost:4444/products/${id}`
			);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});

	return mutation;
};
