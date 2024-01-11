import React from "react";
import "./Header.scss";
import Dropdown from "../dropdown/dropdown";

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">ToDoList</h1>
        <Dropdown />
      </div>
      <a href="https://github.com/zPavel39/web-todo-test">
        <img className="header__image" src="/assets/images/logo_gh.png" alt="GH" />
      </a>
    </header>
  );
};

export default React.memo(Header);