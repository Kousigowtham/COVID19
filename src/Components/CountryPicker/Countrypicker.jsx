import React,{useState,useEffect} from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import {fetchCountryData} from '../../api'
import styles from './Countrypicker.module.css'

const Countrypicker = ({CountryPickerHandler}) => {

const [countries, setcountries] = useState([])


useEffect(() => {

    async  function fetchAPI(){
        const fetchedData = await fetchCountryData();
        setcountries(fetchedData);
    }

    fetchAPI();

}, [setcountries])


    return (
        <React.Fragment>
            <FormControl className={styles.container}>
                <NativeSelect defaultValue='' onChange={ (e)=>CountryPickerHandler(e.target.value)}>
                    <option value=''>Global</option>
                    { countries.map((country,i)=> <option key={i}>{country}</option>)}
                </NativeSelect>
            </FormControl>
        </React.Fragment>
    )
}

export default Countrypicker
