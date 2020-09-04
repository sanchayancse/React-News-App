import React, {useState, useEffect, createRef} from 'react';
import useStyles from './styles';
import classNames from 'classnames';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';


function NewsCard({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) {
    const classes = useStyles();
    const [elRefs,  setElrefs] = useState([]);
    const scrollToRef =(ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(()=>{
        setElrefs((refs)=> Array(20).fill().map((_, j) => refs[j] || createRef() ));

    }, []);

    useEffect(()=>{
        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle])
        }
    },[i, activeArticle, elRefs])
    return (

        <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image={urlToImage || "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimage.shutterstock.com%2Fimage-vector%2Fbreaking-news-live-on-world-260nw-589076237.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fbreaking%2Bnews&tbnid=b6H5YPYUoErBnM&vet=12ahUKEwiq6v_0hJvrAhXXhEsFHX95BfgQMygBegUIARDaAQ..i&docid=HA2b7PRcHJ1uIM&w=401&h=280&q=news%20limages&hl=en&ved=2ahUKEwiq6v_0hJvrAhXXhEsFHX95BfgQMygBegUIARDaAQ"}/>
                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                        <Typography variant="body2" color="textSecondary" component="h2">{source.name} </Typography>
                    </div>
                    <Typography  className={classes.title} gutterBottom varient="h5">{title}</Typography>
                    <CardContent>
                        <Typography varient="body2" color="textSecondary" component="p">{description}</Typography>

                    </CardContent>
                
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Learn More</Button>
                <Typography varient="h5" color="textSecondary">{i + 1}</Typography>
            </CardActions>
        </Card>

    )
}

export default NewsCard
