import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './OrganizationCard.css'

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
});

function OrganizationCard(props) {
    const classes = useStyles();

    const handleClick = () => {
        props.dispatch({type: 'GET_ORG_DETAILS', payload: props.org.id})
        props.dispatch({type: 'GET_ORG_IMAGES', payload: props.org.id})
        props.history.push(`/home/details/${props.org.id}`);
    }

    return (
        <Card className={classes.card}>
                <CardContent>
                    <img className="organization-image" src={props.org.image} alt="volunteer organization" />
                    <Typography gutterBottom variant="h5">
                        {props.org.name}
                    </Typography>
                    {/* <hr className="orange-line"/> */}
                    <p className="orange-line"></p>
                    <br/>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.org.intro}
                    </Typography>
                    <Button onClick={handleClick} style={{marginTop: '10px'}} className="learn-more-button">LEARN MORE</Button>
                </CardContent>
        </Card>
    );
}

export default withRouter(connect()(OrganizationCard));