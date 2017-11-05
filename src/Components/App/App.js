import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import { Navbar, Upload, Analysis, Working } from "../../Components";
import  ComponentWrappers from "../../ComponentWrappers";

class App extends Component{

    constructor(props) {
        
        super(props);

        this.state = {
            tabValue: 0,
        }

        this.changeRoute = this.changeRoute.bind(this);
        this.changeTabValue = this.changeTabValue.bind(this);
        
    }
    
    changeRoute(route) {
        this.props.history.push(route);
    }

    changeTabValue(index) {
        this.setState({ tabValue: index });
    }


    render() {



        return(
            <div>
                <Navbar 
                changeRoute={ this.changeRoute }
                changeTabValue={ this.changeTabValue }
                tabValue={ this.state.tabValue }
                />
                <Route exact path="/" component={ Upload } />
                <Route exact path="/analysis" component={ Analysis } />
                <Route exact path="/working" component={ Working } />
            </div>
        );
    }
}

export default ComponentWrappers(withRouter(App));