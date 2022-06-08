import {Marker} from "react-map-gl";
import bomb from './icons/bomb.png'
import crying from './icons/crying.png'
import facePalm from './icons/face-palm.png'
export function Pin(props) {
    const {lat, lng, index} = props


    const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

    const SIZE = 20;

    return (
        <Marker key={`marker-${index}`} longitude={lng} latitude={lat}>
            <img src={bomb} alt="" style={{width: '25px', height: '25px'}}/>
            <img src={crying} alt="" style={{width: '25px', height: '25px'}}/>
            <img src={facePalm} alt="" style={{width: '25px', height: '25px'}}/>
        </Marker>)
}
