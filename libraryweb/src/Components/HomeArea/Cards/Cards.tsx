import {
  Button,
  CardActions,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";
import "./Cards.css";
import { useSpring, animated, config } from "react-spring";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 40,
    fontFamily: "Montserrat",
    color: "black",
  },
  cover: {
    backgroundImage:
      "url(https://previews.123rf.com/images/ekina/ekina1802/ekina180201566/96334084-texture-background-template-pamper-your-design-with-a-luxurious-light-blue-silk-flag-the-blue-dip-ca.jpg)",
    backgroundPosition: "center",
    // backgroundRepeat: "repeat-y",
    padding: "35px 25px",
    //width: '38rem'
    marginLeft: "80px",
    marginRight: "80px",

    "&:hover": {
      transform:  "scale: (0.3)",
      //transition: "500ms linear",
     
    },
  },
  info: {
    color: "black",
  },
  btn: {
    "&:hover": {
      backgroundColor: "#2196f3",
      opacity: "1.7",
      color: "white",
    },
  },
}));

function Cards(): JSX.Element {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0.6 },
    delay: 1000,
    config: config.molasses,
  });

  const classes = useStyles();

  return (
    <div>
      <animated.div style={props}>
        <Card className={classes.cover}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
             check our coupons
            </Typography>
            <Typography variant="h5" className={classes.info}>
             there a lot of coupons just for you!
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" size="large" className={classes.btn} component={NavLink} to={"/more"} activeClassName="Mui-selected" exact>
              Read more
            </Button>
          </CardActions>
        </Card>
      </animated.div>
    </div>
  );
}

export default Cards;
