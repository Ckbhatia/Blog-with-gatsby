import React, { useState, useEffect } from "react";
import Context from "../context";

export default function Mode(props) {

//dark mode
function Mode(props) {
  const [isDay, toggleDay] = useState(true);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("day")) === true) {
      toggleDay(() => !isDay);
    }
  }, []); //isDay warning

  useEffect(() => {
    if (!isDay) {
      document.getElementById("___gatsby").style.backgroundColor = "#131217";
    }
    return () => {
      document.getElementById("___gatsby").style.backgroundColor = "#fafafc";
    };
  }, [isDay]);

  return (
    <Context.Provider value={{ isDay, toggleDay }}>
      {props.children}
    </Context.Provider>
  );
}}
