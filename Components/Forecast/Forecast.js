import React from "react";
import "./Forecast.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {

  // this code is use to get the another 7 days of weather forecast

  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  );

  const tl = gsap.timeline(); // for activating time line in gsap

  // GSAP animation control

  useGSAP(() => {
    tl.from(".title", {
      x: -150,
      opacity: 0,
      duration: 1,
      delay: 0.5,
    });
    tl.from(".Daily-items", {
      x: -150,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.2,
    });
  }, [data.city]);

  // this code for GSAP to run the animation every time we search for city

  const handleClick = (index) => {
    tl.from(`.daily-details-grid-item-${index}`, {
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.1,
    });
  };

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div onClick={() => handleClick(idx)} className="Daily-items">
                  <Image
                    className="icon-small"
                    src={`/Public/Icons/${item.weather[0].icon}.png`}
                    width={40}
                    height={40}
                    alt="Weather"
                  />
                  <label className="Days">{forecastDays[idx]}</label>
                  <label className="Details">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressur:</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div
                  className={`daily-details-grid-item daily-details-grid-item-${idx}`}
                >
                  <label>Humidity:</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div
                  className={`daily-details-grid-item daily-details-grid-item-${idx}`}
                >
                  <label>Wind Speed:</label>
                  <label>{Math.round(item.wind.speed)} m/s</label>
                </div>
                <div
                  className={`daily-details-grid-item daily-details-grid-item-${idx}`}
                >
                  <label>Feels Like:</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </div>
                <div
                  className={`daily-details-grid-item daily-details-grid-item-${idx}`}
                >
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div
                  className={`daily-details-grid-item daily-details-grid-item-${idx}`}
                >
                  <label>Sea Level:</label>
                  <label>{item.main.sea_level} m</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
