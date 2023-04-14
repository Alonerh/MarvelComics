
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import api from '../api';
import { Container, CardList, Card, ButtonMore, Modal } from '../styles/Characters.styles';
import { ModalComics } from '../styles/Comics.styles';
import { FiChevronDown } from 'react-icons/fi';


interface ResponseData {
    id: number,
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
    const[modal, setModal] = useState(false);
    const[nowModal, setNowModal] = useState<ResponseData>();

    useEffect(()=>{
		api
            .get('/comics')
            .then(response => {
                setComics(response.data.data.results);
            })
            .catch(err => console.log(err));
	}, []);

    useEffect(()=>{

    }, [comics])

    const handleShowMore = useCallback(async()=>{
        try {
            let offset = comics.length;
            const response = await api.get('/comics', {
                params: {
                    offset
                }
            })
            setComics([...comics, ...response.data.data.results]);
            comics.map((item)=>(
                comics.push(item)
            ))
            console.log(nowModal)
        } catch(err) {
            console.log(err);
        }
    }, [comics]);

    const handleShowModal = async(index:number)=>{
        await api
            .get('/comics')
            .then(response => {
                console.log('NowModal: ', console.log(nowModal));
                setNowModal(comics[index])
                // setComics(response.data.data.results[index])
            })
            .catch(err => console.log(err));

        if(modal) {
            setModal(false)
        } else {
            setModal(true)
        }
    }
    const handleCloseModal = () =>{
        setModal(false)
    }


    return (
        <Container>
            <h1>Comics</h1>
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
                    <ModalComics thumbnail={nowModal?.thumbnail}>
                        <div className="containerModal flex justify-end">
                            <div className='X'  onClick={()=>handleCloseModal()}>X</div>
                        </div>
                        <div className="infoComics">
                            <h2>{nowModal?.title}</h2>
                            <div className="infoComics2">
                                <div id='img'/>
                                <div className='infoComicsInside'>
                                    
                                    <br />
                                    <p>
                                        {nowModal?.description != '' &&
                                            nowModal?.description
                                        }
                                        {nowModal?.description == '' &&
                                            'Não há descrição do quadrinho'
                                        }
                                    </p>
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
