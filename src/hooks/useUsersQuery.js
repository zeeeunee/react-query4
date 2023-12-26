import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/user');
	return await response.json();
};

export const useUserQuery = () => {
	return useQuery(['users'], fetchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		cacheTime: 1000 * 5,
	});
};

/*
  fresh: 서버데이터를 최신으로 인식하는 상태 (refetch 필요없는 상태)
  stale: 서버데이터를 오래된 상태로 인식하는 상태 (refetch 필요한 상태)
  inactive: 서버데이터가 더이상 해당 컴포넌트에서 활용되지 않는 상태
  cacheTime: inactive상태에서 얼마까지 데이터를 유지시킬지에 대한 시간값 (default: 1000 * 60 * 5ms 5분)
  statleTime: 처음 dataFetching후 얼마뒤에 fresh -> stale로 변경할지에 대한 시간값 (default: 0ms)
*/
