import { useEffect, useState } from 'react';
import React from 'react';
import api from '../api';

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
	}, [])

    return <h1>Characters</h1>
    
}

export default Characters;