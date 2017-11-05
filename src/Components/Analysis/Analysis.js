import React, { Component } from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import { FormGroup, FormLabel, FormControl } from "material-ui/Form";
import Button from "material-ui/Button";

class Analysis extends Component{

    constructor(props) {

        super(props);

        this.state={
            description: "",
            ap_narration: "",
            hsn_code: "",
            pan: "",
        }

        this.formSubmit = this.formSubmit.bind(this);

    }

    formSubmit() {

    }

    render() {

        const { classes } = this.props

        return(
            <div className={ classes.root } >
                <div className={classes.form} >
                    <FormLabel htmlFor="register">
                        <Typography type="display2" >&nbsp;Test</Typography>
                    </FormLabel>
                    <FormGroup id="register" >
                        <FormControl>
                            <TextField
                                required
                                id="description"
                                label="Description"
                                onChange={(e) => this.setState({ description: e.target.value })}
                                className={classes.input}
                                fullWidth
                            />
                            <br />
                            <TextField
                                required
                                id="apNarration"
                                label="AP Narration"
                                onChange={(e) => this.setState({ ap_narration: e.target.value })}
                                className={classes.input}
                                fullWidth
                            />
                            <br />
                            <TextField
                                required
                                id="hsn_code"
                                label="HSN Code"
                                onChange={(e) => this.setState({ hsn_code: e.target.value })}
                                className={classes.input}
                                fullWidth
                            />
                            <br />
                            <TextField
                                required
                                id="pan"
                                label="Supplier PAN Number"
                                onChange={(e) => this.setState({ pan: e.target.value })}
                                className={classes.input}
                                fullWidth
                            />
                            <br />
                        </FormControl>
                    </FormGroup>
                    <Button raised color="primary" className={classes.button} onClick={ this.formSubmit() } >
                        <Typography type="button" >&nbsp;Test</Typography>
                    </Button>
                </div>
            </div>
        );
    }
}

const styles = {
    root: {
        backgroundColor: "#EEEEEE",
        paddingBottom: "400px",
        paddingLeft: "130px",
    },
    form: {
        paddingTop: 50,
    },
    button: {
        marginTop: 25,
    },
    input: {
        width: 400,
    }
}

export default withStyles(styles)(Analysis);