import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//특정 순번의 서버 데이터 가져오는 fetching func, custom hook (useQuery)
//데이터 목록 호출 함수
const fetchUser = async ({ queryKey }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
	return await response.json();
};

//순서2. 컴포넌트에서 해당 훅 호출시 고유쿼리를 등록하면서 num 값을 전달해서 fetching함수 호출
//반환된 데이터값이 옵션값에 따라 caching처리되면서 반환됨
//데이터 목록 호출 커스텀훅
export const useUserQuery = (num) => {
	return useQuery(['users', num], fetchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		cacheTime: 1000 * 20,
		staleTime: 1000 * 5,
	});
};

//특정 순번의 서버 데이터를 변경하는 fetching func, custom hook (useMutation)
//순서6. 해당 호출되면 num순번의 데이터 객체에서 name값을 같이 전달된 userName 서버데이터를 실제 변경처리한다음 반환
//기존 서버데이터 update함수
export const updateUser = async ([userName, num]) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/${num}`, {
		method: 'PATCH',
		body: JSON.stringify({
			name: userName,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const result = await response.json();
	return result;
};

//데이터 변경 커스텀훅
export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	//순서5. mutate메서드 호출시 아래구문이 자동적으로 호출되면서 등록된 updateUser함수 호출
	return useMutation(updateUser, {
		//순서7. updateUser함수로 서버값 변경시 성공적으로 일어나면 해당 값을 인수로 받아서 고유 쿼리키 값 생성하면서 캐싱처리된 값 쿼리 클라이언트로 전역 관리
		onSuccess: (args) => {
			queryClient.setQueryData(['users', args.id], args);
		},
	});
};
