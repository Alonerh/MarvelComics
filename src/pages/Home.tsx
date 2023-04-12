import { Apresentation } from "../styles/Home.styles";


const Home:React.FC = ()=>{
    return (
        <Apresentation>
            <p className="mt-10">
                Seja bem-vindo à minha API da Marvel
                <br />
                Por favor, escolha uma categoria
            </p>
        </Apresentation>
    )
}

export default Home;