
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import api from '../api';
import { Container, CardList, Card, ButtonMore, Modal } from '../styles/Characters.styles';
import { ModalComics } from '../styles/Comics.styles';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setTitle, setDesc } from '../redux/reducers/comicReducer';


interface ResponseData {
    id?: number,
    name: string,
    description: string,
    thumbnail: {
        path: string,
        extension: string
    },
    title?: string
}




const Comics: React.FC = ()=>{
    const [comics, setComics] = useState<ResponseData[]>([]);
    // console.log('Primeiro comics: ', comics)
    const[nowModal, setNowModal] = useState<ResponseData[]>([]);
    const[modal, setModal] = useState(false);
    const comic = useAppSelector((state)=>state.comic);
    const dispatch = useDispatch();

    useEffect(()=>{
		api
            .get('/comics')
            .then(response => {
                setComics(response.data.data.results);
            })
            .catch(err => console.log(err));
	}, []);


    const handleShowMore = useCallback(async()=>{
        try {
            let offset = comics.length;
            const response = await api.get('/comics', {
                params: {
                    offset
                }
            })
            setComics([...comics, ...response.data.data.results]);
        } catch(err) {
            console.log(err);
        }
    }, [comics]);

    const handleShowModal = async(index:number)=>{
        nowModal.push(comics[index]);
        //console.log('Modal do Push: ', nowModal);
        
        if(modal) {
            setModal(false)
        } else {
            setModal(true)
        }
    }
    const handleCloseModal = () =>{
        setModal(false);
        setNowModal([]);
        //console.log('Close NowModal: ', nowModal)
    }


    return (
        <Container>
            <h1>Comics</h1>
            <div className="container-spans ml-4">
                <span>Comic Name: {comic.title}</span><br />
                <span>Comic Desc: {comic.desc}</span>
            </div>
            
            <CardList>
                {comics.map((item, index)=>(
                    <Card key={index} thumbnail={item.thumbnail}
                        onClick={()=>handleShowModal(index)}>
                        <div id="img" />
                        <h2>{item.title}</h2>
                        <p>
                            {item.description != '' &&
                                item.description
                            }
                            {item.description == '' &&
                                'Não há descrição do quadrinho'
                            }
                        </p>
                    </Card>
                ))}


                 {modal &&
                    <ModalComics  thumbnail={nowModal[0].thumbnail} >
                        <div className="containerModal flex justify-end">
                            <div className='X'  onClick={()=>handleCloseModal()}>X</div>
                        </div>
                        <div className="infoComics">
                            <h2>{nowModal[0].title}</h2>
                            <div className="infoComics2">
                                <div id='img'/>
                                <div className='infoComicsInside'>
                                    <br />
                                    <p>
                                        {nowModal[0].description != '' &&
                                            nowModal[0].description
                                        }
                                        {nowModal[0].description == '' &&
                                            'Não há descrição do quadrinho'
                                        }
                                    </p>

                                    <Link to={'/comics/sendmap'}
                                        style={{backgroundColor:'#f00', padding:5}}>
                                        Enviar este quadrinho para seu endereço
                                    </Link>
                                </div>
                            </div>  
                        </div>
                     </ModalComics>
                }


            </CardList>
            
            <ButtonMore onClick={handleShowMore}>
                <FiChevronDown size={20}/>
                Ver mais
                <FiChevronDown size={20}/>
            </ButtonMore>

        </Container>
        )
    
}

export default Comics;
