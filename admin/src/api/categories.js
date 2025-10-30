import {
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

export const getCategories = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const res = await axios.get(
				"http://localhost:4444/categories"
			);
			return res.data;
		},
	});

	return { data, isLoading, error };
};

export const editCategory = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ id, data }) => {
			const res = await axios.patch(
				`http://localhost:4444/categories/${id}`,
				data
			);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
	});

	return mutation;
};

export const addCategory = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ data }) => {
			const res = await axios.post(
				`http://localhost:4444/categories`,
				data
			);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
	});

	return mutation;
};

export const deleteCategory = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ id }) => {
			const res = await axios.delete(
				`http://localhost:4444/categories/${id}`
			);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
	});

	return mutation;
};
