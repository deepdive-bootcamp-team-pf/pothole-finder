import React, {useRef, useEffect, useState} from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'

export default function Map(){
    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng] = useState(-106.63)
    const [lat] = useState(35.10)
    const [zoom] = useState(14)
    const [API_KEY] = useState('D4b2ldjY7geFrPnuBPU8')

    useEffect(() => {
        if (map.current) return
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        });
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
        new maplibregl.Marker({color: "#FF0000", draggable: true})
            .setLngLat([-106.6300, 35.1000])
            .addTo(map.current)
        new maplibregl.Marker({color: "#FF0000", draggable: true})
            .setLngLat([-106.6200, 35.1100])
            .addTo(map.current)
        new maplibregl.Marker({color: "#FF0000", draggable: true})
            .setLngLat([-106.6350, 35.1100])
            .addTo(map.current)
        new maplibregl.Marker({color: "#FF0000", draggable: true})
            .setLngLat([-106.6250, 35.1090])
            .addTo(map.current)
    })

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    )
}