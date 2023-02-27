import React from "react";
import { useEffect } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker
} from "react-google-maps";
import { map } from "./soc";



function Map() {
    const data = map.use()

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <>
            <GoogleMap
                defaultZoom={16}
                // defaultCenter={{ lat: 40.800758, lng: 31.172050}}
                defaultCenter={{ lat: 40.800758, lng: 31.172050 }}
            >
                <Marker
                    position={{
                        lat: parseFloat(data[0]),
                        lng: parseFloat(data[1])
                    }}
                />
            </GoogleMap>
        </>
    )
};



const MapComponent = withScriptjs(withGoogleMap(Map));

export default () => (
    <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAecqyDkT7X0aikDKCSQIuM1-bGekxqcM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `300px`, width: "500px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
);
