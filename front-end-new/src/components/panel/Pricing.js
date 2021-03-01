import React, { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import StarIcon from '@material-ui/icons/StarBorder'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { createOrder, orderPaid } from '../../actions/account'
import { useHistory } from 'react-router-dom'
import { parseSearch } from '../../mylib/supports/functions'
import AppContext from '../../context/app-context'
import { ACTION } from '../../mylib/constant/constStr'
import ROUTE from '../../mylib/constant/route'
const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor: '#fbcc3f',
        color: '#000000'
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

const tiers = [
    {

        title: 'Pro',
        price: '19',
        crossLine: '25',
        buttonText: 'Upgrade',
        buttonVariant: 'contained',
        month: 1,
        description: 'Unlimited Access',
    },
    {

        title: 'Enterprise',
        subheader: 'Most popular',
        price: '199',
        crossLine: '250',
        buttonText: 'Upgrade',
        buttonVariant: 'contained',
        month: 12,
        description: 'Enjoy the whole year',
    },
    {
        title: 'Vip',
        price: '99',
        crossLine: '150',
        buttonText: 'Upgrade',
        buttonVariant: 'contained',
        month: 6,
        description: 'Most reasonalbe using-term',
    },
];


export default function Pricing() {
    const classes = useStyles();

    const { dispatchSnack, dispatchAccount, account } = useContext(AppContext)
    const [payment_url, setURL] = useState(null)

    let history = useHistory()
    useEffect(() => {
        let mounted = true
        if (mounted && payment_url !== null) {
            const win = window.open(payment_url, '_blank')
            win !== null && win.focus()
        }
        return () => mounted = false
    }, [payment_url])
    useEffect(() => {
        let mounted = true
        if (mounted) {
            if (history.location.search !== '') {
                const payment = parseSearch(history.location.search)
                // console.log(payment)
                orderPaid(payment.total_amount).then(res => {
                    dispatchAccount({
                        type: ACTION.UPDATE_EXPIRED_DATE,
                        data: res.expiredDate
                    })
                    dispatchSnack({
                        type: ACTION.SET_SNACK, data: {
                            message: res.message,
                            status: res.status
                        }
                    })                 
                    history.push('/')
                })
            }
        }
        return () => mounted = false
    }, [history])

    const pay = (months) => {
        if (account.profile.email === '') {
            history.push(ROUTE.SIGN_IN)
            dispatchSnack({
                type: ACTION.SET_SNACK, data: {
                    message: 'You must login to charge',
                    status: -1
                }
            })
            return
        }
        else {
            createOrder(months).then(res => {
                // console.log(res.payment_url)
                if (res.payment_url !== null) {
                    setURL(res.payment_url)
                }
            })
        }

    }
    return (
        <React.Fragment>
            <Paper>
                <Container maxWidth="sm" component="main" className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Picking your Premium
            </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" component="p">
                        We've got a plan that's right for you
            </Typography>
                </Container>
                {/* End hero unit */}
                <Container maxWidth="md" component="main">
                    <Grid container spacing={5} alignItems="flex-end">
                        {tiers.map((tier) => (
                            // Enterprise card is full width at sm breakpoint
                            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                                <Card>
                                    <CardHeader
                                        title={tier.title}
                                        subheader={tier.subheader}
                                        titleTypographyProps={{ align: 'center' }}
                                        subheaderTypographyProps={{ align: 'center', color: 'secondary' }}
                                        action={tier.title === 'Enterprise' ? <StarIcon /> : null}
                                        className={classes.cardHeader}
                                    />
                                    <CardContent>
                                        <div className={classes.cardPricing}>
                                            <Typography component="h2" variant="h3" color="textPrimary">
                                                ${tier.price}
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary">
                                                {tier.month} {tier.month === 1 ? ' /Month' : ' /Months'}
                                            </Typography>
                                        </div>
                                        <ul style={{ color: 'gray' }}>
                                            <Typography align="center">{tier.description}</Typography>
                                            <Typography component="li" align="right" style={{ fontSize: '30px' }}>
                                                <s>
                                                    ${tier.crossLine}
                                                </s>
                                            </Typography>

                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button fullWidth variant={tier.buttonVariant} color="secondary"
                                            onClick={() => pay(tier.month)}
                                        >
                                            {tier.buttonText}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Paper>
        </React.Fragment>
    );
}