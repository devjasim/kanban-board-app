import React from 'react';
import './Header.styles.scss';

const Header = () => {
  return (
    <div className="heading">
      <h2>Kanban Board Application</h2>
      <p>
        You will find the GitHub Repository &nbsp;
        <a target="_blank" href="https://github.com/devjasim/kanban-board-app" rel="noreferrer">
          here
        </a>
      </p>
    </div>
  );
};

export default Header;
