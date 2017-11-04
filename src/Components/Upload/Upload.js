import React, { Component } from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";

class Upload extends Component{
    render() {

        const { classes } = this.props;

        return(
            <div className={ classes.root } >
                <Typography
                    className={classes.title}
                    gutterBottom
                    align="center"
                >
                    Upload Invoice here
                </Typography>
                <input accept="application/pdf" className={classes.input} id="file" multiple type="file" />
                <label htmlFor="file">
                    <Button raised component="span" className={ classes.center } >
                        Upload
                    </Button>
                </label>
            </div>
        );
    }
}

const styles = {
    title: {
        flex: 1,
        paddingTop: 125,
        paddingBottom: 5,
        fontSize: 30,
        fontWeight: 400,
        letterSpacing: 1.4,
        color: "#0D49BD",
    },
    input: {
        display: 'none',
    },
    center: {
        margin: "0 0 0 -45px",
        position: "absolute",
        left: "50%"
    },
    root: {
        backgroundColor: "#EEEEEE",
        paddingBottom: "400px",
    }
}

export default withStyles(styles)(Upload);