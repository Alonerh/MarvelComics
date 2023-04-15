import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { ContainerSend } from '../styles/SendMap.styles'

export interface MapPageProps {

}


// Chave de API: AIzaSyAliy-LOADZ-ndxQccI4fUliIcnc9kUReg

const SendMap = ()=>{
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAliy-LOADZ-ndxQccI4fUliIcnc9kUReg"
      });

    type positionType = {
        lat: number,
        lng: number
      }

    const position:positionType = {
        lat: -7.222795687119939, 
        lng: -39.32448356297147
    };
    

    return (
        <ContainerSend>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{width: '700px', height: '700px'}}
                    center={position}
                    zoom={15}
                >
                <Marker position={position} options={{
                    label: {
                        text: 'Posição teste',
                        className: 'map-marker'
                    }
                }}/>
                </GoogleMap>
                ) : <></>
            }
        </ContainerSend>
    )
}

export default SendMap;