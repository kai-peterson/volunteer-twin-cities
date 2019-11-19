import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './OrganizationCard.css'

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        // maxHeight: '45vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        // height: 'fit-content',
    },
    // media: {
    //     height: '50%',
    // },
});

function OrganizationCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <img className="organization-image" src={props.org.image} alt="volunteer organization" />
                    <hr/>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.org.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.org.intro}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default OrganizationCard;