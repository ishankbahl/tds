import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class AlertDialog extends Component {
  constructor(props) {
      
    super(props);

    this.state = {
        open: props.open,
    };

  }

  componentWillReceiveProps(nextProps) {
      this.setState({ open: nextProps.open });
  }

  render() {

    const { rates } = this.props;
    var text = "";
    if(rates[0])
        text = text + " 1% ";
    if(rates[1])
        text = text + " 2% ";
    if(rates[2])
        text = text + " 10% ";

    return (
      <div>
        <Button onClick={this.props.handleClickOpen}>Open alert dialog</Button>
        <Dialog open={this.state.open} onRequestClose={this.props.handleRequestClose}>
          <DialogTitle>Applicable TDS rate (predictions)</DialogTitle>
          <DialogContent>
            <DialogContentText>
              { text }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="accent" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}