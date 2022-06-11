import React, {useState} from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'
import Map, {Marker} from 'react-map-gl'
import mapLibre from 'maplibre-gl'
import { Pin } from './Pin'
import pin from "./icons/pin.png"
import {useDispatch} from "react-redux";
import {setLocation} from '../../store/location'


export function GetMarker() {
    const dispatch = useDispatch()

    const [lat, setLat] = useState(35.116363)
    const [lng, setLng] = useState(-106.604730)

    const initialEffects = () => {
        dispatch(setLocation({}))
    }

    React.useEffect(initialEffects, [dispatch])

    const dragEnd = (event) => {
        dispatch(setLocation({lat: event.lngLat.lat, lng: event.lngLat.lng}))
        setLat(event.lngLat.lat)
        setLng(event.lngLat.lng)
    }

    return (
            <Marker
                longitude={lng}
                latitude={lat}
                anchor="bottom"
                draggable={true}
                onDragEnd={dragEnd}
            >
                <img src={pin} style={{width: '50px', height: '50px'}}/>
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