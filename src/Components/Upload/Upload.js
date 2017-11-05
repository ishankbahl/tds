import React, { Component } from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import FileUpload from "material-ui-icons/FileUpload";
import Dropzone from "react-dropzone";
import axios from "axios";

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
        },

        this.onDrop = this.onDrop.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.matchCode = this.matchCode.bind(this);

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
                    this.setState({ rate1: true });
                }
                else {
                    this.setState({ rate2: true });
                }
            }
            if (two.find(this.matchCode))
                this.setState({ rate2: true });
            if (ten.find(this.matchCode))
                this.setState({ rate10: true });

            this.setState({ dialog: true }, () => {console.log(this.state);});
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

    render() {

        const { classes } = this.props;
        const { dialog, rate1, rate2, rate10 } = this.state;
        console.log(dialog);
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
                <input accept="application/pdf" className={classes.input} id="file" multiple type="file" />
                <Dropzone onDrop={ this.onDrop } className={ classes.centers } >
                    <FileUpload className={ classes.icon } />
                </Dropzone>
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
        paddingLeft: "130px",
    },
    icon: {
        paddingRight: 5,
    }
}

export default withStyles(styles)(Upload);