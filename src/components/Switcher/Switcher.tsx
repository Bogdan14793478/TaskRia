import React, { useState, useEffect, useRef, useCallback } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import IconButton from "@mui/material/IconButton";

import data from "../../utils/constants.json";
import { Data } from "../../utils/interface";

import classes from "./styles.module.css";

const Switcher = () => {
  const [carouselItems, setCarouselItems] = useState<Data[]>(data);
  const [currentIndex, setCurrentIndex] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  const shiftPrev = (data: Data[]) => {
    let firstItem = data.shift();
    if (firstItem) {
      data.splice(data.length, 0, firstItem);
      setCarouselItems(data);
    }
  };

  const getPrevious = () => {
    let index = currentIndex + 1;
    if (index > carouselItems.length - 1) {
      index = 0;
    }
    shiftPrev([...carouselItems]);
    setCurrentIndex(index);
  };

  const shiftNext = (data: Data[]) => {
    let lastItem = data.pop();
    if (lastItem) {
      data.splice(0, 0, lastItem);
      setCarouselItems(data);
    }
  };

  const getNext = () => {
    let index = currentIndex - 1;
    if (index < 0) {
      index = carouselItems.length - 1;
    }
    shiftNext([...carouselItems]);
    setCurrentIndex(index);
  };

  const setBackgroundPosition = useCallback(
    (e) => {
      if (e.deltaX < 0) {
        setTimeout(() => {
          getNext();
        }, 120);
      }
      if (e.deltaX > 0) {
        setTimeout(() => {
          getPrevious();
        }, 120);
      }
    },
    [getNext, getPrevious]
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
    <div className={classes.carousel}>
      <div className={classes.containerCarousel} ref={ref}>
        {carouselItems.map((item, index) => {
          return (
            <div key={index} className={classes.cardImage}>
              <img
                src={item.Images[0]}
                alt="/"
                className={classes.imgCarousel}
              />
              <p className={classes.textCarousel}>
                {item.Plot.length > 50
                  ? `${item.Plot.substring(0, 50)}...`
                  : item.Plot}
              </p>
            </div>
          );
        })}
      </div>
      <div className={classes.chevron}>
        <div
          className={[classes.buttonSwitch, classes.buttonSwitchLeft].join(" ")}
        >
          <IconButton onClick={getNext}>
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>
        </div>
        <div
          className={[classes.buttonSwitch, classes.buttonSwitchRight].join(
            " "
          )}
        >
          <IconButton onClick={getPrevious}>
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Switcher;
