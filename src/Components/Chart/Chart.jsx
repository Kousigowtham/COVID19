import React,{useState, useEffect} from 'react'
import {Line, Bar, Doughnut} from 'react-chartjs-2'
import {fectchDailyData} from '../../api'
import { NativeSelect,FormControl,InputLabel } from '@material-ui/core'
import styles from './Chart.module.css'

const Chart = ({data, country}) => {

    const [dailyData, setdailyData] = useState([])
    const [FromTo, setFromTo] = useState({
        from:'01-01-0001',
        to:'12-31-9999'
    });
    const [screenWidth, setscreenWidth] = useState(window.screen.width)


    useEffect(()=>{
        if(!country)
        setFromTo({
           from:'01-01-0001',
           to:'12-31-9999'
       })
    },[country])

    useEffect(() => {
        fectchDailyData().then((fetcheddailyData)=>{
            setdailyData(fetcheddailyData)
        })
    }, [])
    useEffect(() => {
        setscreenWidth(window.screen.width)
    }, [screenWidth])
    
    const barChart =(
        data !== null ?
    <div className={styles.bar}>
        <Bar
        data={{
            labels:['Infected','Recovered','Deaths'],
            datasets:[{
                label:'people',
                backgroundColor:['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
                data:[data.confirmed.value,data.recovered.value,data.deaths.value]
            }]
        }}
        options={{
            legend:{display:false,
            title:{ display:true,
                    text:`current state in ${country}`}},
        }}
        /></div> : null
    )

    const Filter = (
        dailyData !== null ?
        <div className={styles.container}>
        <FormControl className={styles.filerstyle}>
            <InputLabel htmlFor="from-native">From</InputLabel>
                <NativeSelect
                     value={FromTo.from}
                     onChange={(e)=>setFromTo({...FromTo, from: e.target.value})}
                     inputProps={{
                        name: 'from',
                        id: 'from-native',
                        }}
                >
                    {console.log(new Date(FromTo.to).getTime())}
                    <option aria-label="None" value=""/>
                    {dailyData.filter(x=> new Date(x.date).getTime() < new Date(FromTo.to).getTime()).map(({date})=><option value={date}>{date}</option>)}
                </NativeSelect>
            </FormControl>
            <FormControl className={styles.filerstyle}>

                <InputLabel htmlFor="to-native">To</InputLabel>
                <NativeSelect
                     value={FromTo.To}
                     onChange={(e)=>setFromTo({...FromTo, to: e.target.value})}
                     inputProps={{
                        name: 'to',
                        id: 'to-native',
                        }}
                >      
                    <option aria-label="None" value=""/>
                    {dailyData.filter(x=> new Date(x.date).getTime() > new Date(FromTo.from).getTime()).map(({date})=><option value={date}>{date}</option>)}
                </NativeSelect>
            </FormControl>
        </div> : null
    )

    const lineChart = (
    
        dailyData !== null ?
    <div className={styles.line}>
    <Line
        data={{
            labels: dailyData.filter(x=> new Date(x.date).getTime() >= new Date(FromTo.from).getTime() && new Date(x.date).getTime() <= new Date(FromTo.to).getTime()).map(({date})=> date),
            datasets:[{
                data: dailyData.filter(x=> new Date(x.date).getTime() >= new Date(FromTo.from).getTime() && new Date(x.date).getTime() <= new Date(FromTo.to).getTime()).map(({confirmed})=> confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true
            },{
                data: dailyData.filter(x=> new Date(x.date).getTime() >= new Date(FromTo.from).getTime() && new Date(x.date).getTime() <= new Date(FromTo.to).getTime()).map(({deaths})=> deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill: true
            }]
        }}


    /></div> : null)

const doughnutChart =(

    data !== null ?
    <div className={styles.doughnut}>
    <Doughnut
        data={{
            labels: ['Infected','Recovered','Deaths'],
            datasets:[{
                data: [data.confirmed.value, data.recovered.value, data.deaths.value],
                label: 'people',
                backgroundColor:['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
            }]
        }}
        options={{
            cutoutPercentage: 60
        }}

    /></div> : null)


    return (
        <React.Fragment>

                {!country ? Filter : null}
                { !country ?  doughnutChart : null}
                { !country ?  lineChart : barChart}
        </React.Fragment>
    )
}

export default Chart
