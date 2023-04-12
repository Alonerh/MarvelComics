import { useEffect, useState } from 'react';
import React from 'react';
import api from '../api';
import * as C from './styles';

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
                console.log('segundo log: ', characters);
            })
            .catch(err => console.log(err));
	}, []);

    return (
        <C.Container>
            <h1>Characters</h1>
            <ul>
                {characters.map((item, index)=>(
                    <li  key={index}>
                        <img 
                            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                            alt={`Foto do ${item.name}`}/>
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </C.Container>
        )
    
}

export default Characters;