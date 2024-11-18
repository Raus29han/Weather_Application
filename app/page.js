"use client";
import CW from "@/Components/Current-Weather/CW";
import Search from "@/Components/Search/Search";
import React, { useEffect, useState } from "react";
import { API_KEY, CW_API } from "./Api";
import Forecast from "@/Components/Forecast/Forecast";
import Loading from "@/Components/Loading-Page/Loading";
import Header from "@/Components/Header/Header";

const Page = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // for fetching local or current location of an user

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });

      fetchWeatherData(latitude, longitude);
    };

    const errorCallback = (error) => {
      setErrorMessage("Unable to retrieve your location.");
      console.error("Geolocation error:", error);
    };

    // For getting permission from user to allow acsses for location

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  }, []); 

  // for fetching weather data for current weather and forcast

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const CWresponse = await fetch(
        `${CW_API}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      if (!CWresponse.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const currentWeatherData = await CWresponse.json();

      const cityName = currentWeatherData.name;
      const countryCode = currentWeatherData.sys.country;

      const FORresponse = await fetch(
        `${CW_API}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      if (!FORresponse.ok) {
        throw new Error("Failed to fetch forecast data");
      }

      const forecastData = await FORresponse.json();

      // Update the name of state for both current weather and forecast
      setCurrentWeather({ city: `${cityName}, ${countryCode}`, ...currentWeatherData });
      setForecast({ city: `${cityName}, ${countryCode}`, ...forecastData });
    } catch (error) {
      setErrorMessage("Error fetching weather data!");
      console.error("Error fetching weather data:", error);
    }
  };

  // for weather details on search

  const handleOnSearch = (e) => {
    const [lat, lon] = e.value.split(" ");
    const latitude = parseFloat(lat).toFixed(6);
    const longitude = parseFloat(lon).toFixed(6);

    fetchWeatherData(latitude, longitude);
  };


  // for rendering loading page
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  console.log(currentWeather)
  console.log(forecast)

  return (
    <div className="container">
      <Header/>

      <Search onSearch={handleOnSearch} />

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {currentWeather && <CW data={currentWeather} />}

      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default Page;
