import React, { useEffect, useRef } from "react";
import "./CW.css";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CW = ({ data }) => {
  useGSAP(() => {
    gsap.from(".weather", {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.5,
    });
  }, [data.city]);

  return (
    <>
      <div className="weather shadow">
        <div className="top">
          <div>
            <p className="city">{data.city}</p>
            <p className="weather-condition">{data.weather[0].description}</p>
          </div>

          <Image
            className="Icon bounce"
            src={`/Public/Icons/${data.weather[0].icon}.png`}
            width={80}
            height={80}
            alt="Weather Icon"
          />
        </div>

        <div className="bottom">
          <p className="temp">{Math.round(data.main.temp)}°C</p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label-details">Details</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind Speed</span>
              <span className="parameter-value">
                {Math.round(data.wind.speed)} m/s
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.main.humidity} %</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{data.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CW;
