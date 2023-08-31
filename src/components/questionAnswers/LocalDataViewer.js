import React, {useState, useEffect} from 'react';
import axios from 'axios';

const LocalDataViewer = () => {
  const [data, setData] = useState(['dummy']);

  useEffect(() => {
    fetchData();
  },[])


  const fetchData = () => {
    axios.get(`http://localhost:${process.env.REACT_APP_PORT}/test`)
      .then((res)=> {
        // console.log('successy boiiii', res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
    return (
      <div>
        <p>local data stuffs</p>
        {console.log(data[0])}
      </div>
    );
}

export default LocalDataViewer;