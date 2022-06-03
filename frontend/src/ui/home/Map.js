import React, {useRef, useEffect, useState} from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'

export default function Map(){
    const pins = {
        'type': 'Potholes',
        'potholes': [
            {
                'type': 'Pothole',
                'severity': 3,
                'properties': {
                    'message': 'Buzz Lightyear, Mission Log. I just downloaded this app after going through a near-death experience. Today was the day, folks. The Vonnegut has been officially decommissioned after colliding with this world-splitting fissure. Survivor\'s guilt plagues my heart as I reflect on the sacrifice my beloved car made in order for me to be here today. I vow to verify and repost this pothole daily, until it is repaired!',
                    'iconSize': [35, 35]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-106.6300, 35.1000]
                }
            },
            {
                'type': 'Pothole',
                'severity': 2,
                'properties': {
                    'message': 'Thanks to this crater on Priceton Drive I\'ll be adding air to my tire later.',
                    'iconSize': [35, 35]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-106.6200, 35.1100]
                }
            },
            {
                'type': 'Pothole',
                'severity': 3,
                'properties': {
                    'message': 'I thought it was just a puddle, now I get the pleasure of taking my car in for repairs. Awesome...',
                    'iconSize': [35, 35]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-106.6350, 35.1100]
                }
            },
            {
                'type': 'Pothole',
                'severity': 1,
                'properties': {
                    'message': 'Ran over this little doozie on my way out of the Cantina. Wouldn\'t have expected that tiny thing to shake up the car like it did.',
                    'iconSize': [35, 35]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-106.6250, 35.1090]
                }
            }
        ]
    }

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
        map.current.addControl(new maplibregl.NavigationControl(), 'bottom-left')
        pins.potholes.forEach(function (marker) {
            const el = document.createElement('div')
            el.className = 'marker'
            if (marker.severity === 1) {
                el.classList.add('face-palm')
            } else if (marker.severity === 2) {
                el.classList.add('crying')
            } else if (marker.severity === 3) {
                el.classList.add('bomb')
            }
            el.style.width = marker.properties.iconSize[0] + 'px'
            el.style.height = marker.properties.iconSize[1] + 'px'
            el.style.backgroundSize = '100% 100%'

            el.addEventListener('click', function () {
                window.alert(marker.properties.message)
            })
            new maplibregl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map.current)
        })
    })

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    )
}