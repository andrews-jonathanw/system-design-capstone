import React from 'react';
import axios from 'axios';

const LocalDataViewer = () => {

  console.log(process.env.REACT_APP_PORT);
  const fetchData = () => {
    axios.get(`http://localhost:${process.env.REACT_APP_PORT}/test`)
      .then(()=> {
        console.log('successy boiiii')
      })
      .catch(err => {
        console.log(err);
      })
  }
    return (
      <div>
        <p>local data stuffs</p>
        {fetchData()}
      </div>
    );
}

export default LocalDataViewer;