import React, { useState, useEffect, useRef, useCallback } from "react";

import MyselfCard from "../../components/FilmCard/FilmCard";
import Navbar from "../../components/Navbar/Navbar";
import Switcher from "../../components/Switcher/Switcher";

import data from "../../utils/constants.json";
import { Data } from "../../utils/interface";

import classes from "./styles.module.css";

const MainPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [countDistY, setCountY] = useState(1000);
  const [infoAboutFilms, setInfoAboutFilms] = useState<Data[]>(data);

  const setBackgroundPosition = useCallback(
    (e) => {
      if (countDistY > 5000) return;
      if (e.pageY > countDistY) {
        setTimeout(() => {
          setInfoAboutFilms([...infoAboutFilms, ...data]);
        }, 120);
        setCountY(countDistY + 1000);
      }
    },
    [setCountY, infoAboutFilms, countDistY]
  );

  useEffect(() => {
    ref.current && ref.current.addEventListener("wheel", setBackgroundPosition);
    const removeListener = () => {
      ref.current &&
        ref.current.removeEventListener("wheel", setBackgroundPosition);
    };
    return () => {
      removeListener();
    };
  }, [setBackgroundPosition]);

  return (
    <div className={classes.section}>
      <Navbar />
      <div className={classes.container}>
        <Switcher />
        <div className={classes.cards} ref={ref}>
          {infoAboutFilms.map((item, index) => {
            return <MyselfCard item={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
