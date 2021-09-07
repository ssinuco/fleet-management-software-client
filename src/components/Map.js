import React, {useRef, useEffect, useContext, useState} from 'react';
import {createMapView, addPoints} from "../utils/map";
import AppContext from "../context/AppContext";

const Map = () => {
    const mapRef = useRef();
    const [view, setView] = useState(null);
    const { state } = useContext(AppContext);
    const { positions } = state;

    useEffect(() => {
        const view = createMapView(mapRef.current);
        setView(view);
    }, []);

    useEffect(() => {
        addPoints(view, positions);
    }, [positions]);

    return <div className="webmap" ref={mapRef}></div>;
}

export default Map;
