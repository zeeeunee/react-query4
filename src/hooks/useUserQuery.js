import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
	return await response.json();
};

export const useUserQuery = () => {
	return useQuery(['users'], fetchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		cacheTime: 1000 * 20,
		staleTime: 1000 * 5,
	});
};
