import React from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'
import Map, {Marker} from 'react-map-gl'
import mapLibre from 'maplibre-gl'
import { Pin } from './Pin'

export function GetMarker() {
    return (
            <Marker longitude={-100} latitude={40} anchor="bottom" >
                <img src="./icons/pin.png"/>
            </Marker>
    )
}

export default function MapFunction(props) {

    const {show} = props

    const [points] = React.useState([
        { lat: 35.116363, lng: -106.604730},
        { lat: 35.110367, lng: -106.590706},
        { lat: 35.104307, lng: -106.609019}
    ])


    return (
        <>
                <Map

                    mapLib={mapLibre}
                    initialViewState={{
                        latitude: 35.126899,
                        longitude: -106.575077,
                        zoom: 12
                    }}
                    style={{height: '100vh'}}
                    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=D4b2ldjY7geFrPnuBPU8"
                >
                    {points.map((point, index) => <Pin lat={point.lat} lng={point.lng} index={index} key={index}/>)}
                    {show ? <GetMarker/> : null}
                </Map>
        </>
    )
}

