import React from 'react';

import './App.css';

import Routes from './routes';

const App = () => {
  return (
    <div className="page-container">
      <div className="content">
        <Routes />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;