import React from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'
import Map from 'react-map-gl'
import mapLibre from 'maplibre-gl'
import { Pin } from './Pin'

export default function MapFunction() {

    const [points] = React.useState([
        { lat: 35.132088, lng: -106.657851},
        { lat: 35.152941, lng: -106.643294 },
        { lat: 35.138914, lng: -106.694326},
        { lat: 35.23, lng: -106.4444}
    ])

    return (
        <>
                <Map

                    mapLib={mapLibre}
                    initialViewState={{
                        latitude: 35.0844,
                        longitude: -106.6504,
                        zoom: 12
                    }}
                    style={{height: '100vw'}}
                    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=D4b2ldjY7geFrPnuBPU8"
                >
                    {points.map((point, index) => <Pin lat={point.lat} lng={point.lng} index={index} key={index}/>)}
                </Map>
        </>
    )
}