import React, { useState, useEffect } from 'react';
import { FaLaptop, FaMobile, FaTabletAlt } from "react-icons/fa";
import axios from 'axios';

import Laptop from '../HomePage/Laptop.png';
import '../HomePage/Home.css';


export default function Home() {

    const [location, setLocation] = useState({
        'longitude': '',
        'latitude': ''
    });

    const [weatherData, setWeatherData] = useState({
        'name': '',
        'temp': '',
        'weather': ''
    });


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);


    function getCoordinates(position) {
        setLocation({
            'longitude': position.coords.longitude,
            'latitude': position.coords.latitude
        });
    }

    function calculateCelsius(temp) {
        const celcius = Math.floor(temp - 273.1);
        return celcius;
    }

    async function getWeather() {
        try {
            const res = await axios(`http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=081d50bc5ecfaa4fedc4826c07da4611`);
            setWeatherData({
                'name': res.data.name,
                'temp': calculateCelsius(res.data.main.temp),
                'weather': res.data.weather[0].main
            });
            console.log(res);
        } catch (e) {
            console.warn(e);
        }
    }

    useEffect(() => {
        getWeather();
    }, [location.latitude])



    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }

    return (
        <div className="home-page">
            <div className="msg-container">
                <div className="home-page-text">
                    <h1>Shop With Us</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus. Tincidunt eget nullam non nisi est sit amet. </p>
                </div>
                <div className="logo-weather">
                    <div className="test-weather">
                        {location.longitude && location.latitude ?
                            <>
                                <p>{weatherData.name}</p>
                                <p>{weatherData.temp}&#8451;</p>
                                <p>{weatherData.weather}</p>
                            </>
                            : null
                        }
                    </div>
                    <img src={Laptop} alt="Loading..." />
                </div>
            </div>
            <div className="page-devider"></div>
            <div className="card-container">
                <div className="home-page-cards">
                    <h2>Phones</h2>
                    <FaMobile size={100} />
                </div>
                <div className="home-page-cards">
                    <h2>Tablets</h2>
                    <FaTabletAlt size={100} />
                </div>
                <div className="home-page-cards">
                    <h2>Laptops</h2>
                    <FaLaptop size={100} />
                </div>
            </div>
        </div>

    )
}