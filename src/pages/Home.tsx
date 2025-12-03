import { Link } from 'react-router-dom';

const Home: React.FC = () => {
	return (
		<div>
			<h1>Welcome to "What Are You Doing Now?"</h1>
			<p>Start logging your activities!</p>
			<Link to="/log">Log Activity</Link>
			<br />
			<Link to="/history">View History</Link>
		</div>
	);
};

export default Home;