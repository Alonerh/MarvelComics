import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Home from "./pages/Home";
import GlobalStyle from './styles/global';
import { Routes, Route, useNavigate } from 'react-router-dom';


const App:React.FC = () => {
	const navigate = useNavigate();

	const handleToCharacters = ()=>{
		navigate('/characters');
	}

	return (
		<>
		<div className="container p-3 flex justify-center max-w-screen-2xl bg-zinc-600">
			<button 
				className="mr-3 bg-red-700 p-2 rounded"
				onClick={handleToCharacters}
			>
				Characters
			</button>
			<button className="mr-3 bg-red-700 p-2 rounded">Comics</button>
		</div>
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/characters" element={<Characters />}/>
			<Route path="/comics" element={<Comics />}/>
		</Routes>
		<GlobalStyle />
		</>
		
	)
}

export default App;
