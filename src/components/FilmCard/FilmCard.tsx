import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { getFromStorage } from "../../utils/helpers";
import { ItemData } from "../../utils/interface";

import classes from "./styles.module.css";

const MyselfCard: React.FC<ItemData> = ({ item }) => {
  const [data] = useState(item);
  const [expanded, seteExpanded] = useState(false);

  const handleExpandClick = () => {
    seteExpanded(!expanded);
  };

  const isAuth = getFromStorage("isAuth");

  return (
    <div className={classes.card}>
      <div className={classes.imageCard}>
        <img src={data.Images[0]} className={classes.image} alt="/" />
      </div>
      <p className={classes.cardTitle}>{item.Title}</p>
      {isAuth ? (
        <>
          <div className={classes.details}>
            <p className={classes.info}>
              {item.Genre} | {item.Director} | {item.Released}
            </p>
            <div className={classes.variantOne}>
              <ExpandMoreIcon onClick={handleExpandClick} />
            </div>
          </div>
          <div className={classes.dynamicPart}>
            {expanded && (
              <div style={{ display: "flex" }}>
                <div className={classes.detailsFotViewContent}>
                  <p className={classes.personalInfo}>
                    Director: {item.Director}.
                  </p>
                  <p className={classes.personalInfo}>Actors: {item.Actors}.</p>
                </div>
                <div className={classes.variantTwo}>
                  <ExpandMoreIcon onClick={handleExpandClick} />
                </div>
              </div>
            )}
            {expanded && (
              <div className={[classes.actionDetails, classes.line].join(" ")}>
                <p className={[classes.info, classes.personalInfo].join(" ")}>
                  imdbRating: {item.imdbRating}
                </p>
                {Number(item.imdbRating) < 7 || item.imdbRating === "N/A" ? (
                  <ThumbDownAltIcon />
                ) : (
                  <ThumbUpIcon />
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyselfCard;
