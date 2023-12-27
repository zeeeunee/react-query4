import { useUserQuery } from './hooks/useUserQuery';
import { useState } from 'react';

export default function UserName() {
	const [Num, setNum] = useState(1);
	const { isSuccess, data } = useUserQuery(Num);

	return (
		<div className='UserName'>
			<h1>User Name</h1>
			<button onClick={() => setNum(1)}>변경1</button>
			<button onClick={() => setNum(2)}>변경2</button>

			<h2>name1:{isSuccess && data.name}</h2>
		</div>
	);
}
