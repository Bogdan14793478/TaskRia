import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LinkPage, NamePage } from "./interface";
import Logo from "../../Image/AUTO.png";
import Modal from "../Modal/Modal";

import classes from "./styles.module.css";

const pages = [
  { name: "Популярні авто", id: 1 },
  { name: "Автосалони", id: 2 },
  { name: "Тест-драйви", id: 3 },
  { name: "Скоро у продажу", id: 4 },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeChooseMenu, setActiveChooseMenu] = useState<number | null>(null);
  let navigate = useNavigate();

  const chooseAdressLink = (page: any) => {
    console.log(page, "page");
    if (page.name === NamePage.popularСars) navigate(LinkPage.popularСars);
    if (page.name === NamePage.carShowrooms) navigate(LinkPage.carShowrooms);
    if (page.name === NamePage.testDrive) navigate(LinkPage.testDrive);
    if (page.name === NamePage.sellingSoon) navigate(LinkPage.sellingSoon);
  };

  return (
    <div className={classes.wrapper}>
      <img src={Logo} alt="" className={classes.logoSmall} />
      <div className={classes.container}>
        <img src={Logo} alt="" className={classes.logoBig} />
        <div className={classes.menuChoosePage}>
          <div className={classes.choosePage}>
            {pages.map((page) => (
              <span
                key={page.id}
                className={
                  page.id === activeChooseMenu
                    ? [classes.chooseLink, classes.activeLink].join(" ")
                    : classes.chooseLink
                }
                onClick={() => {
                  chooseAdressLink(page);
                  setActiveChooseMenu(page.id);
                }}
              >
                {page.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.entryBtn} onClick={() => alert("Ви ввійшли")}>
        Увійти
      </div>
      <div className={classes.entryBtnMeny} onClick={() => setShowMenu(true)}>
        Mеню
      </div>
      <Modal
        active={showMenu}
        setActive={setShowMenu}
        children={pages}
        openPage={chooseAdressLink}
      />
    </div>
  );
};

export default Navbar;
