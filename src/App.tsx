import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Home from "./pages/Home";
import GlobalStyle from './styles/global';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Marvel from './assets/Marvel_Logo.png';
import SendMap from "./pages/SendMap";


const App:React.FC = () => {
	const navigate = useNavigate();

	const handleToCharacters = (page:string)=>{
		navigate(page);
	}

	return (
		<>
		<div className="container p-3 flex justify-between items-center max-w-screen-2xl bg-red-600">
			<div className="separator1  bg-red-600 cursor-pointer" >
				<img src={Marvel} alt="" width={150} className="ml-3" onClick={()=>handleToCharacters('/')}/>
			</div>
			<div className="separator2 bg-red-600">
				<button 
					className="w-28 mr-3 bg-red-700 p-2 rounded text-2xl hover:bg-slate-200 hover:text-red-600"
					onClick={()=>handleToCharacters('/comics')}
					>
					Comics
				</button>
				<button 
					className="w-28 mr-3 bg-red-700 p-2 rounded text-2xl hover:bg-slate-200 hover:text-red-600"
					onClick={()=>handleToCharacters('/characters')}
					>
					Characters
				</button>
			</div>
		</div>
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/characters" element={<Characters />}/>
			<Route path="/comics" element={<Comics />}/>
			<Route path="/comics/sendmap" element={<SendMap />}/>
		</Routes>
		<footer className="flex justify-center font-extrabold text-black bg-red-600">&copy; Feito por Rafael Alcantara</footer>
		<GlobalStyle />
		</>
		
	)
}

export default App;
