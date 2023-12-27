import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//데이터 목록 호출 함수
const fetchUser = async () => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
	return await response.json();
};

//데이터 목록 호출 커스텀훅
export const useUserQuery = () => {
	return useQuery(['users'], fetchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		cacheTime: 1000 * 20,
		staleTime: 1000 * 5,
	});
};

const deleteUser = async ({ queryKey }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`, {
		method: 'DELETE',
	});
	return await response.json();
};

//인수로 순번을 받아서 해당 순번에 데이터를 삭제하는 커스텀훅
export const useDeleteQuery = () => {
	//기존 생성한 queryClient 인스턴스를 호출
	//해당 queryClient인스턴스에서 활용할수 있는 prototype의 method인 setQueryData라는 서버데이터 변경요청값을 등록하는 함수를 가져올 수 있음
	const queryClient = useQueryClient(); //App.js에서 가져옴

	//useMutation(비동기데이터변경함수, 옵션설정객체{onSuccess:mutate요청이 성공적으로 수행되면 연결될 핸들러함수})
	//useMutation훅이 deleteUser라는 내부 fetching함수를 호출해서 서버데이터 변경요청
	return useMutation(deleteUser, {
		//서버데이터 변경이 성공시 변경된 서버 데이터값을 다시 공의 쿼리키로 등록해서 react-query로 비동기 데이터 관리
		onSuccess: (args) => {
			queryClient.setQueryData(['users', args.id], args);
		},
	});
};
