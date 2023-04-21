import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "./Loader/Loader";

const Weather = () => {
  const [place, setPalce] = useState("");

  //function for fetch data from the api
  const fetchData = () => {
     return axios.get(`http://localhost:4000/:${place}`);
   
  };
  // use useQuery for fetch the data
  const { data, refetch } = useQuery("weather", fetchData, { enabled: false });
  // onClick funtion
  const handleData = (place) =>{
    if(place === ""){
      console.log("invalid city name");
    }else{
      refetch();
    }
  }

 
  //using ref for get input box for focus
  const inputRef = useRef();
  //for focus the input box in initial load
  useEffect(() => {
    inputRef.current.focus();
    fetchData();
  }, []);
  return (
    <div className="main">
      <div className="weather-container">
        <div className="search">
          <input
            type="text"
            placeholder="Enter the city name"
            spellCheck="false"
            ref={inputRef}
            onChange={(e) => setPalce(e.target.value)}
            required
          />
          <button onClick={()=>handleData(place)}>
            <FiSearch />
          </button>
        </div>

       {data ? <div className="weather-details">
          <img
            src={data?.data?.current.condition?.icon}
            alt=""
            className="weather-icon"
          />
          <h1>
            {" "}
            {data?.data?.current.temp_c} <span>°C</span>
          </h1>
          <h2>{data?.data?.location.name}</h2>
          <h2>{data?.data?.current.condition?.text}</h2>
        </div> :<Loader />}
        
       {data ? <div className="details">
          <div className="other-details">
            <h1>
              <u>Other Details</u>
            </h1>
          </div>
          <h3>
            Country : <span>{data?.data?.location.country}</span>
          </h3>
          <h3>
            Region : <span>{data?.data?.location.region}</span>
          </h3>
          <h3>
            Time : <span>{data?.data?.location.localtime}</span>
          </h3>
          <h3>
            Time Zone : <span>{data?.data?.location?.tz_id} </span>
          </h3>
        </div> : ""}
      </div>
      {place === "invalid" ? <h1>Invalid city</h1>: ""}
    </div>
  );
};

export default Weather;
