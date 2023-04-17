import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { ContainerSend } from '../styles/SendMap.styles'
import {ChangeEvent, useState} from 'react';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setTitle, setDesc } from '../redux/reducers/comicReducer';
import { useNavigate } from 'react-router-dom';

export interface MapPageProps {


}


// Chave de API: AIzaSyAliy-LOADZ-ndxQccI4fUliIcnc9kUReg

const SendMap = ()=>{

    type positionType = {
        lat: number,
        lng: number
      }

    const [map, setMap] = useState<google.maps.Map>();
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
    const [markers, setMarkers] = useState<any>([]);
    const comic = useAppSelector((state)=>state.comic);
    const navigate = useNavigate();
    const [adressValue, setAdressValue] = useState('');


    const position:positionType = {
        lat: -7.222795687119939, 
        lng: -39.32448356297147
    };

    const onMapLoad = (map: google.maps.Map)=>{
        setMap(map)
    }
    const onLoad = (ref: google.maps.places.SearchBox)=>{
        setSearchBox(ref)
    }
    const onPlacesChanged = ()=>{
        const places = searchBox!.getPlaces();
        console.log(places);
        const place = places![0];
        const location = {
            lat: place?.geometry?.location?.lat() || 0,
            lng: place?.geometry?.location?.lng() || 0

        };
        setMarkers([...markers, location])
        map?.panTo(location);
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        alert(`Seu pedido foi enviado para: ${adressValue}`);
        setAdressValue('');
    }
    const toPassAdress = (e:ChangeEvent<HTMLInputElement>)=>{
       setAdressValue(e.target.value);
    }
    
    

    return (
        <ContainerSend style={{display:'flex'}}>
            <button onClick={()=>navigate(-1)} style={{position:'absolute', padding:'10px'}}>Voltar</button>
            <div className="InfoSend flex flex-col justify-center items-center w-3/6 p-5">
                <h2>O quadrinho que será enviado é: </h2>
                <div className="texts-container">
                    <span>{comic.title}</span>
                    <p>{comic.desc}</p>
                </div>
                <h2>Digite o seu endereço abaixo e aperte em enviar!</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Digite o endereço' 
                        value={adressValue} 
                        onChange={toPassAdress}/>
                    <input type="submit" className='submit' 
                        value={'Enviar'}
                    />
                </form>
            </div>
            
            <LoadScript 
                googleMapsApiKey='AIzaSyAliy-LOADZ-ndxQccI4fUliIcnc9kUReg'
                libraries={['places']}>
                <GoogleMap
                    onLoad={onMapLoad}
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    center={position}
                    zoom={15}
                >
                    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                        <input className='adress text-black border' 
                        placeholder='Procurar locais' 
                        value={''}/>
                    </StandaloneSearchBox>
                    {markers.map((item:any, index:number)=>(
                        <Marker key={index} position={item}/>
                    ))}
                    {/* <Marker 
                        position={position} 
                        options={{
                            label: {
                                text: 'Posição teste',
                                className: 'map-marker'
                            },
                        }}
                    /> */}
                </GoogleMap>
            </LoadScript>
        </ContainerSend>
    )
}

export default SendMap;