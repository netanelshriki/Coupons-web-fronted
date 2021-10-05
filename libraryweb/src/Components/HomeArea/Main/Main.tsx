import { Grid } from "@material-ui/core";
import Cards from "../Cards/Cards";
import "./Main.css";

function Main(): JSX.Element {
    return (
        <div className="Main">
			<Cards/>
            <br/>
            <Grid>
            </Grid>
        </div>
    );
}

export default Main;
