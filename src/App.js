import React,{useState, useEffect} from 'react'
import styles from './App.module.css';
import {Cards, Countrypicker, Chart} from './Components'
import {fetchData} from './api';

function App() {

  const [data, setdata] = useState(null);
  const [country, setcountry] = useState('')

  useEffect(()=>{

    fetchData().then(fetchedData=>{
       setdata(fetchedData)
     })

  },[])

  const CountryPickerHandler=(countryName)=>{
    
    fetchData(countryName).then(fetchedData=>{
      setdata(fetchedData);
      setcountry(countryName);
    })
  }

  return (

    <div className={styles.container}>
        <Cards data={data} />
        <Countrypicker  CountryPickerHandler={CountryPickerHandler} />
        <Chart data={data} country={country}/>
    </div>
  );
}

export default App;
