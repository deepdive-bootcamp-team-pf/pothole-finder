import {Marker} from "react-map-gl";
import bomb from './icons/bomb.png'
import crying from './icons/crying.png'
import facepalm from './icons/face-palm.png'


export function Pin(props) {
    const {lat, lng} = props

    const icon = [
        {name: 'Mild ', value: '1', img: facepalm},
        {name: 'Moderate ', value: '2', img: crying},
        {name: 'Severe ', value: '3', img: bomb},
    ]

    return (
        <Marker key={icon.value} longitude={lng} latitude={lat}>
            <img src={icon[0].img} alt="test" style={{width: '25px', height: '25px'}}/>
        </Marker>)
}