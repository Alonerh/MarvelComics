import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import api from '../api';
import { Container, CardList, Card, ButtonMore, Modal } from '../styles/Characters.styles';
import { FiChevronDown } from 'react-icons/fi';

interface ResponseData {
    id: number,
    name: string,
    description: string,
    thumbnail: {
        path: string,
        extension: string
    };
}


const Characters: React.FC = ()=>{
    const [characters, setCharacters] = useState<ResponseData[]>([]);
    const[modal, setModal] = useState(false);
    const[nowModal, setNowModal] = useState<ResponseData>();

    useEffect(()=>{
		api
            .get('/characters')
            .then(response => {
                console.log(response.data.data.results);
                setCharacters(response.data.data.results);
            })
            .catch(err => console.log(err));
	}, []);

    const handleShowMore = useCallback(async()=>{
        try {
            let offset = characters.length;
            const response = await api.get('/characters', {
                params: {
                    offset
                }
            })
            setCharacters([...characters, ...response.data.data.results]);
        } catch(err) {
            console.log(err);
        }
    }, [characters]);

    const handleShowModal = async(index:number)=>{
        await api
            .get('/characters')
            .then(response => {
                console.log('NowModal: ', console.log(nowModal));
                setNowModal(characters[index])
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
            <h1>Characters</h1>
            <CardList>
                {characters.map((item, index)=>(
                    <Card key={index} thumbnail={item.thumbnail}
                        onClick={()=>handleShowModal(index)}>
                        <div id="img" />
                        <h2>{item.name}</h2>
                        <p>
                            {item.description != '' &&
                                    item.description
                                }
                                {item.description == '' &&
                                    'Não há descrição do personagem'
                                }
                        </p>
                        
                    </Card>
                ))}
                {modal &&
                    <Modal thumbnail={nowModal?.thumbnail}>
                        <div className="containerModal flex justify-end">
                            <div className='X'  onClick={()=>handleCloseModal()}>X</div>
                        </div>
                        <div className="infoCharacters">
                            <h2>{nowModal?.name}</h2>
                            <div className="infoCharacters2">
                                <div id='img'/>
                                <div className='infoCharactersInside'>
                                    
                                    <br />
                                    <p>
                                        {nowModal?.description != '' &&
                                            nowModal?.description
                                        }
                                        {nowModal?.description == '' &&
                                            'Não há descrição do personagem'
                                        }
                                    </p>
                                </div>
                            </div>  
                        </div>
                     </Modal>
                }
                {/* {modal &&
                    <Modal>
                        <div className="containerModal flex justify-end">
                            <div className='X' 
                                onClick={()=>handleCloseModal()}
                            >X</div>
                        </div>
                        <h2>{nowModal?.name}</h2>
                        <br />
                        <p>
                            {nowModal?.description != '' &&
                                nowModal?.description
                            }
                            {nowModal?.description == '' &&
                                'Não há descrição do personagem'
                            }
                            </p>
                     </Modal>
                } */}

            </CardList>
            
            <ButtonMore onClick={handleShowMore}>
                <FiChevronDown size={20}/>
                Ver mais
                <FiChevronDown size={20}/>
            </ButtonMore>

        </Container>
        )
    
}

export default Characters;