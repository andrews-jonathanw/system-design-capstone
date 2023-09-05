import React, {useState, useEffect} from 'react';
import axios from 'axios';

const LocalDataViewer = () => {
  const [data, setData] = useState(['dummy']);

  useEffect(() => {
    fetchData();
  },[])

  console.log('successy boiiii', process.env.REACT_APP_PORT);
  const fetchData = () => {
    axios.get(`http://localhost:${process.env.REACT_APP_PORT}/reviews/`).then((res) => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
    return (
      <div>
        {console.log(data)}
        {/* { data.map((single) => {
          console.log(data)
          // return <p>{data}</p>
        })} */}
      </div>
    );
}

export default LocalDataViewer;