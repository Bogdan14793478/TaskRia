import React, { Dispatch, SetStateAction } from "react";

import classes from "./styles.module.css";

interface Data {
  name: string;
  id: number;
}

interface Props {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: Data[];
  openPage: (item: Data) => void;
}

const Modal: React.FC<Props> = ({ active, setActive, children, openPage }) => {
  console.log(children, "children");
  return (
    <div
      className={
        active ? [classes.modal, classes.modalActive].join(" ") : classes.modal
      }
      onClick={() => setActive(false)}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.elemModal}>
          {children.map((item) => (
            <span
              key={item.id}
              className={classes.chooseLink}
              onClick={() => {
                openPage(item);
                setActive(false);
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
        <div onClick={() => alert("Ви ввiйшли")}>Увійти</div>
      </div>
    </div>
  );
};

export default Modal;
