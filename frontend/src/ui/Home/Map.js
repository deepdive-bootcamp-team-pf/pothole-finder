import React, {useEffect, useState} from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'
import Map, {GeolocateControl, Marker, NavigationControl, Popup, ScaleControl} from 'react-map-gl'
import mapLibre from 'maplibre-gl'
import {Pin} from './Pin'
import pin from "./icons/pin.png"
import {useDispatch, useSelector} from "react-redux";
import {setLocation} from '../../store/location'
import {fetchAllPotholes} from "../../store/potholes";

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
        //     onClick={e => {
        //         // If we let the click event propagates to the map, it will immediately close the popup
        //         // with `closeOnClick: true`
        //         e.originalEvent.stopPropagation();
        //         setPopupInfo(potholeInfo);
        //     }}
        >
            <img src={pin} alt={'draggable marker'} style={{width: '80px', height: '80px'}}/>
        </Marker>
    )
}

export default function MapFunction(props) {
    const {show} = props

    const potholes = useSelector(state => state.potholes ? state.potholes : []);
    const dispatch = useDispatch();
    const effects = () => {
        dispatch(fetchAllPotholes());
    };
    useEffect(effects, [dispatch]);

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
                    {potholes.map(pothole => <Pin pothole={pothole} latitude={pothole.potholeLat} longitude={pothole.potholeLng} description={pothole.potholeDescription} key={pothole.potholeId}/>)}
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