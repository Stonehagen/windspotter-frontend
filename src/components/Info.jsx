import React from 'react';
import '../styles/Info.css';

const Info = () => {

  return (
    <div className="info">
      <h2 className='infoTitle'>about <span>WIND<span>MATE</span></span></h2>
      <p className="infoText">
        Windmate is a website that provides you with the latest wind forecast
        for your favourite spots in Germany. This website is still in
        development and currently only supports a few locations. More locations
        will be added in the near future or upon request.
      </p>
      <div className="infoList">
        <p>Right now the following weather models are supported:</p>
        <ul>
          <li>ICON-D2 (48h)</li>
          <li>ICON-EU (5d)</li>
          <li>GFS (12d)</li>
        </ul>
      </div>
      <p className="infoText">
        To requrest a new location, a new feature or to report a bug, please
        send an email to{' '}
        <a href="mailto:tobias.steinhagen@me.com">
          {'tobias.steinhagen@me.com'}
        </a>
        .
      </p>
      <p className="infoText">
        For more information please visit my website{' '}
        <a href="https://stonehagen.com">{'stonehagen.com'}</a>.
      </p>
    </div>
  );
};

export default Info;
