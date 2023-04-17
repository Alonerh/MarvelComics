import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { ContainerSend } from '../styles/SendMap.styles'
import {useState} from 'react';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setTitle, setDesc } from '../redux/reducers/comicReducer';

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
    const dispatch = useDispatch();


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

        }
        setMarkers([...markers, location])
        map?.panTo(location);
    }
    const handleChangeTitle = ()=>{
        dispatch(setTitle('Pedro'))
    }
    const handleChangeDesc = ()=>{
        dispatch(setDesc('Descrição de Pedro'))
    }
    

    return (
        <ContainerSend>
            <button onClick={()=>handleChangeTitle()}>Trocar Nome</button>
            <button onClick={()=>handleChangeDesc()}>Trocar Desc</button><br />
            <span>Comic Name: {comic.title}</span><br />
            <span>Comic Desc: {comic.desc}</span>
            <LoadScript 
                googleMapsApiKey='AIzaSyAliy-LOADZ-ndxQccI4fUliIcnc9kUReg'
                libraries={['places']}>
                <GoogleMap
                    onLoad={onMapLoad}
                    mapContainerStyle={{width: '99vw', height: '100vh'}}
                    center={position}
                    zoom={15}
                >
                    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                        <input className='adress' placeholder='Digite um endereço'/>
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