import {Marker} from 'react-map-gl'
import bomb from './icons/bomb.png'
import crying from './icons/crying.png'
import facepalm from './icons/face-palm.png'

export const Pin = ({pothole}) => {

    switch (pothole.potholeSeverity){
        case '1':
            return (
                <Marker key={pothole.potholeId} longitude={pothole.potholeLng} latitude={pothole.potholeLat}>
                    <img src={facepalm} alt="test" style={{width: '25px', height: '25px'}}/>
                </Marker>)
        case '2':
            return (
                <Marker key={pothole.potholeId} longitude={pothole.potholeLng} latitude={pothole.potholeLat}>
                    <img src={crying} alt="test" style={{width: '25px', height: '25px'}}/>
                </Marker>)
        case '3':
            return (
                <Marker key={pothole.potholeId} longitude={pothole.potholeLng} latitude={pothole.potholeLat}>
                    <img src={bomb} alt="test" style={{width: '25px', height: '25px'}}/>
                </Marker>)
    }
}