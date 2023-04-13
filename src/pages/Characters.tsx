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

const Characters: React.FC = ()=>{
    const [characters, setCharacters] = useState<ResponseData[]>([]);

    useEffect(()=>{
		api
            .get('/characters')
            .then(response => {
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

    return (
        <Container>
            <h1>Characters</h1>
            <CardList>
                {characters.map((item, index)=>(
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

export default Characters;