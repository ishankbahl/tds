import React, { Component } from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import FileUpload from "material-ui-icons/FileUpload";
import Dropzone from "react-dropzone";
import axios from "axios";
import TextField from "material-ui/TextField";
import { FormGroup, FormLabel, FormControl } from "material-ui/Form";

import { RateDialog } from "../../Components";

const oneOrTwo = [9954, 9963, 9964, 9965, 9966, 9967, 9968, 9969, 9972, 9973, 9983, 9984, 9985, 9987, 9988];

const ten = [9963, 9972, 9973, 9982, 9983, 9993];

const two = [9973, 9966, 9985];

class Upload extends Component{

    constructor(props) {

        super(props);

        this.state = {
            rate1: false,
            rate2: false,
            rate10: false,
            hsn_code:null,
            dialog: false,
            description: "",
            ap_narration: "",
            hsn_code_form: "",
            pan: "",
        },

        this.onDrop = this.onDrop.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.matchCode = this.matchCode.bind(this);
        this.formSubmit = this.formSubmit.bind(this);

    }

    matchCode(element) {
        return element == parseInt(this.state.hsn_code);
    }

    handleScan(response) {
        if(response.hsn_code){
            console.log(response.hsn_code);
            this.setState({ hsn_code: response.hsn_code });

            if (oneOrTwo.find(this.matchCode)){

                if(response.supplier_pan_no.split("")[3] === "P"){
                    this.setState({ rate1: true, dialog: true });
                }
                else {
                    this.setState({ rate2: true, dialog: true });
                }
            }
            if (two.find(this.matchCode))
                this.setState({ rate2: true, dialog: true });
            if (ten.find(this.matchCode))
                this.setState({ rate10: true, dialog: true });

        }
        else {
            console.log("don't execute");
        }
    }

    onDrop(acceptedFile) {

        let data = new FormData();
        data.append('file', acceptedFile[0]);
        data.append('name', acceptedFile[0].name);


        axios.post('http://localhost:8080/api/upload', data)
            .then((response) => {
                console.log(response);
                this.handleScan(response.data);
            })
            .catch((err) => {console.log(err)});
    }

    handleClickOpen = () => {
        this.setState({ dialog: true });
    };
    
    handleRequestClose = () => {
        this.setState({ dialog: false });
    };

    formSubmit() {

        const response = {
            hsn_code: this.state.hsn_code_form,
            supplier_pan_no: this.state.pan,
        }

        this.handleScan(response);

    }

    render() {

        const { classes } = this.props;
        const { dialog, rate1, rate2, rate10 } = this.state;
        const rates = [];
        rates.push(rate1, rate2, rate10);

        return(
            <div className={ classes.root } >
                <Typography
                    className={classes.title}
                    gutterBottom
                >
                    Upload Invoice here
                </Typography>
                <input accept="application/pdf" className={classes.inputNone} id="file" multiple type="file" />
                <Dropzone onDrop={ this.onDrop } className={ classes.centers } >
                    <FileUpload className={ classes.icon } />
                </Dropzone>
                <Typography
                    className={classes.title}
                    gutterBottom
                >
                    OR
                </Typography>
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
                                id="apNarration"
                                label="AP Narration"
                                onChange={(e) => this.setState({ ap_narration: e.target.value })}
                                className={classes.input}
                                fullWidth
                            />
                            <br />
                            <TextField
                                id="hsn_code"
                                label="HSN Code"
                                onChange={(e) => this.setState({ hsn_code_form: e.target.value })}
                                className={classes.input}
                                fullWidth
                            />
                            <br />
                            <TextField
                                id="pan"
                                label="Supplier PAN Number"
                                onChange={(e) => this.setState({ pan: e.target.value })}
                                className={classes.input}
                                fullWidth
                            />
                            <br />
                        </FormControl>
                    </FormGroup>
                    <Button raised color="primary" className={classes.button} onClick={ this.formSubmit } >
                        <Typography type="button" >&nbsp;Test</Typography>
                    </Button>
                </div>
                <RateDialog open={ dialog } rates={ rates } handleClickOpen={ this.handleClickOpen }
                    handleRequestClose={ this.handleRequestClose }
                 />
            </div>
        );
    }
}

const styles = {
    title: {
        flex: 1,
        paddingTop: 25,
        paddingBottom: 5,
        fontSize: 30,
        fontWeight: 400,
        letterSpacing: 1.4,
        color: "#0D49BD",
    },
    inputNone: {
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
        paddingLeft: "130px",
    },
    icon: {
        paddingRight: 5,
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

export default withStyles(styles)(Upload);