import React, { Component } from "react";
import DesktopHome from "./desktop";
import MobileHome from "./mobile";
import Utils from "../../_helpers/utils";
import ThemeService from "../../_services/ThemeService";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "mobile",
        };
    }

    componentDidMount() {
        let view = Utils.isMobileDevice()===true?"mobile":"desktop";
        this.setState({view : view});
        ThemeService.getActiveTheme();
    }

    render() {
        return (
        <>
           {this.state.view==='mobile'?<MobileHome {...this.props} ></MobileHome>:<DesktopHome {...this.props} ></DesktopHome>}
        </>
        );
    }
  
}

export default Home;