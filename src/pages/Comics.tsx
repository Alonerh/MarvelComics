
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import api from '../api';
import { Container, CardList, Card, ButtonMore } from '../styles/Characters.styles';
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

const Comics: React.FC = ()=>{
    const [comics, setComics] = useState<ResponseData[]>([]);

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

    return (
        <Container>
            <h1>Comics</h1>
            <CardList>
                {comics.map((item, index)=>(
                    <Card key={index} thumbnail={item.thumbnail}>
                        <div id="img" />
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                    </Card>
                ))}
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
