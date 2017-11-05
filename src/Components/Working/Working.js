import React, { Component } from "react";
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';


class Working extends Component{
    render() {

        const { classes } = this.props;

        return(
            <div className={ classes.root } >
                <Card>
                    <CardContent>
                        <Typography type="headline" component="h2">
                            How does it all work?
                        </Typography>
                        <Typography component="p">
                            jhbsxjasbxjsbxkjasxbajksxb
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const styles = {
    root: {
        backgroundColor: "#EEEEEE",
        paddingBottom: "450px",
        paddingLeft: "130px",
        paddingRight: "130px",
        paddingTop: "25px",
    }
}

export default withStyles(styles)(Working);