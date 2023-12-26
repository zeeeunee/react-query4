import { Link } from 'react-router-dom';

export default function Menu() {
	return (
		<div className='Menu'>
			<li>
				<Link to='./'>menu</Link>
			</li>
			<li>
				<Link to='./name'>name</Link>
			</li>
			<li>
				<Link to='./address'>address</Link>
			</li>
		</div>
	);
}
