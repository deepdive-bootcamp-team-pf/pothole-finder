import React from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'
import Map, {Marker} from 'react-map-gl'
import mapLibre from 'maplibre-gl'
import { Pin } from './Pin'
import pin from "./icons/pin.png"


export function GetMarker() {
    const dragEnd = (event) => {
        console.log(event.lngLat.lng)
        console.log(event.lngLat.lat)
    }

    return (
            <Marker
                longitude={-106.575077}
                latitude={35.126899}
                anchor="bottom"
                draggable={true}
                onDragEnd={dragEnd}
            >
                <img src={pin} style={{width: '80px', height: '80px'}}/>
            </Marker>
    )
}

export default function MapFunction(props) {

    const {show} = props

    const [points] = React.useState([
        { lat: 35.116363, lng: -106.604730},
        { lat: 35.110367, lng: -106.590706},
        { lat: 35.104307, lng: -106.609019},
        { lat: 35.123987, lng: -106.649704},
        { lat: 35.139077, lng: -106.545731}
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