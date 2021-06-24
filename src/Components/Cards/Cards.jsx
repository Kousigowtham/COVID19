import React from 'react'
import styles from './Cards.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'
import {Grid, Card, CardContent, Typography } from '@material-ui/core'

const Cards = ({data}) => {


    
    if(data ==null){
        return 'Loading...'
    }

    return (
        <React.Fragment>

            <Grid container gutterBottom  className={styles.container}>
                <Grid item xs={12} md={3} component={Card} className={cx(styles.card,styles.infected)}>
                    <CardContent>
                        <Typography  color='textSecondary'>Infected</Typography>
                        <Typography  variant='h5'>
                            <CountUp 
                                start={0}
                                end={data.confirmed.value}
                                duration={2.5}
                                separator=','
                            />
                        </Typography>
                        <Typography color='textSecondary'>{new Date(data.lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className={cx(styles.card,styles.recovered)}>
                    <CardContent>
                        <Typography  color='textSecondary'>Recovered</Typography>
                        <Typography  variant='h5'>
                            <CountUp 
                                start={0}
                                end={data.recovered.value}
                                duration={2.5}
                                separator=','
                            />
                        </Typography>
                        <Typography color='textSecondary'>{new Date(data.lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className={cx(styles.card,styles.deaths)}>
                    <CardContent>
                        <Typography  color='textSecondary'>Deaths</Typography>
                        <Typography  variant='h5'>
                            <CountUp 
                                start={0}
                                end={data.deaths.value}
                                duration={2.5}
                                separator=','
                            />
                        </Typography>
                        <Typography color='textSecondary'>{new Date(data.lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>Number of deaths due to COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default Cards
