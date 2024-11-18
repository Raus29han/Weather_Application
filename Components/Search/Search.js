"use client"

import { GOI_API_URL, goiApioptions } from "@/app/Api";
import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import "./Search.css"


const Search = ({ onSearch }) => {
  const [search, setSearch] = useState([]);
  
  const searchHolder = (e) => {
    setSearch(e);
    onSearch(e);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GOI_API_URL}/cities/?minPopulation=100000&namePrefix=${inputValue}`,
        goiApioptions
      );
  
      const result = await response.json();
      console.log(result.data);

      const options = result.data.map((city)=>({
        value: `${city.latitude}, ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`
      }));

      return {
        options
      };

    } catch (error) {
      console.error(error);
      return{options: []};
    }
  };

  

  return (
    <>
    
      <AsyncPaginate
        placeholder="Enter a city"
        debounceTimeout={600}
        value={search}
        onChange={searchHolder}
        loadOptions={loadOptions} 
        classNames={"hover"}    
      />
    </>
  );
};

export default Search;
