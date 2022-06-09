import {Marker} from "react-map-gl";
import bomb from './icons/bomb.png'
import crying from './icons/crying.png'
import facePalm from './icons/face-palm.png'
export function Pin(props) {
    const {lat, lng, index} = props


    return (
        <Marker key={`marker-${index}`} longitude={lng} latitude={lat}>
            <img src={bomb} alt="" style={{width: '25px', height: '25px'}}/>
            <img src={crying} alt="" style={{width: '25px', height: '25px'}}/>
            <img src={facePalm} alt="" style={{width: '25px', height: '25px'}}/>
        </Marker>)
}
