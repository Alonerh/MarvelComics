import Characters from "./Characters";
import GlobalStyle from './styles/global';
import { Routes, Route } from 'react-router-dom';


const App:React.FC = () => {
	return (
		<>

			<Characters />
			<GlobalStyle />
		</>
	)
}

export default App;
