import { useState, useEffect } from "react";
import Location from 'react-native-location';

export default useLocation = () => {

    const [location, setLocation] = useState()

    const getLocation = async () => {
        try {
            const granted = await Location.requestPermission({ android: { detail: "fine" } });
            if (!granted) return;
            const { latitude, longitude } = await Location.getLatestLocation();
            setLocation({ latitude, longitude });
        } catch (error) {
            alert(error.message);
        }
    }


    useEffect(() => {
        getLocation();
    }, [])

    return location;

}