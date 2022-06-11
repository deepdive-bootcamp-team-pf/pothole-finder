import React from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'
import Map, {GeolocateControl, Marker, NavigationControl, Popup, ScaleControl} from 'react-map-gl'
import mapLibre from 'maplibre-gl'
import {Pin} from './Pin'
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
        //     onClick={e => {
        //         // If we let the click event propagates to the map, it will immediately close the popup
        //         // with `closeOnClick: true`
        //         e.originalEvent.stopPropagation();
        //         setPopupInfo(potholeInfo);
        //     }}
        >
            <img src={pin} style={{width: '80px', height: '80px'}}/>
        </Marker>
    )
}

export default function MapFunction(props) {

    const {show} = props

    const [points] = React.useState([
        {lat: 35.116363, lng: -106.604730},
        {lat: 35.110367, lng: -106.590706},
        {lat: 35.104307, lng: -106.609019},
        {lat: 35.123987, lng: -106.649704},
        {lat: 35.139077, lng: -106.545731}
    ])

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

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

                <GeolocateControl position="bottom-left"/>
                <NavigationControl position="bottom-left"/>
                <ScaleControl/>

                {/*<Popup*/}
                {/*    anchor="top"*/}
                {/*    longitude={Number(popupInfo.longitude)}*/}
                {/*    latitude={Number(popupInfo.latitude)}*/}
                {/*    onClose={() => setPopupInfo(null)}*/}
                {/*>*/}
                {/*    <div>*/}
                {/*        {popupInfo.city}, {popupInfo.state} |{' '}*/}
                {/*        <a*/}
                {/*            target="_new"*/}
                {/*            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}*/}
                {/*        >*/}
                {/*            Wikipedia*/}
                {/*        </a>*/}
                {/*    </div>*/}
                {/*    <img width="100%" src={popupInfo.image}/>*/}
                {/*</Popup>*/}

            </Map>
        </>
    )
}