import React, {Component} from 'react';
import XAPIUtils from './xapiutils';
// import API from './cryptojs_v3.1.2'
// import xAPIWrapper from './xapiwrapper'


class XapiMain extends Component {
    constructor(){
        super();
        this.state = {o:{}}
        //this.sendAPIStatement = this.sendAPIStatement.bind(this);
    }
    componentDidMount() {
        this.sendAPIStatement()
    }
    //generates and sends xAPI statement
    sendAPIStatement() {
        var o = {"reqCode":"","name":"Introduction to Conventional Lathe-ilearn React","typeName":"announcement","typeId":6,"lrsConfig":{"accessUrl":"https://triangles.edusquares.com/api/studyresources/636","userName":"S16","config":{"endpoint":"https://learninglocker.edusquares.com/data/xAPI/","password":"3ca31ba978a2b1ea22c3847896cd614005bcee17","user":"c9ed50be0eef4bbf089fa5362b3db944c521ca04"},"enabled":true,"dashboard":"https://learninglocker.edusquares.com/dashboards/5dba8b30c96f2805843350d8/5dba8bdcc96f2805843350e0/Shareable"},"id":636,"type":"","url":"","content":"<section itemprop=\"blogPost\" itemscope=\"itemscope\" itemtype=\"https://schema.org/BlogPosting\">\r\n<h2><strong>Conventional Lathe:<\/strong><\/h2>\r\n<img alt=\"\" src=\"http://webfront.studentdetails.com/nttf2_testing/uploads/common/Image/CLathe.png\" /><\/section>\r\n&nbsp;\r\n\r\n<section itemprop=\"blogPost\" itemscope=\"itemscope\" itemtype=\"https://schema.org/BlogPosting\">\r\n<p>The general lathe has a wide processing object, the adjustment range of the spindle rotation speed and the feed amount is large. The inner and outer surfaces, end faces, and internal and external threads of the workpiece can be processed. This type of lathe is mainly operated manually by the worker. It is easy to operate. In the early stage, the speed is adjusted, the gear is moved, the starting lever is lifted, and then the joystick is pushed forward. The turning tool advances, the rear pulls, the turning tool retreats to the left, and the turning tool goes to the left. Left and right are the same. Although the operation of the general vehicle is simple, the processing of the parts is a technical activity, and the workers will look at the measuring tools and drawings for processing. When machining small batches of parts,conventional lathes have a greater efficiency advantage than CNC lathes. Many times the general-purpose lathes have been processed, and the CNC lathes are still in the programming stage. Due to this feature, the ordinary lathe still has a market, suitable for single-piece, small batch production and maintenance workshops.<\/p>\r\n\r\n<p>These lathes can be divided into a variety of conventional lathes of different specifications, such as LT6232 and LT6250, depending on the center height and center distance. In addition to turning all kinds of rotary workpieces, they can also turn various threads, such as metric thread, inch thread, modulus thread, diametric thread and end thread.<\/p>\r\n\r\n<p>In order to improve the processing diameter of the conventional lathe, a gap bed lathe was derived(also called saddle lathe).<\/p>\r\n\r\n<p>The left end of the gap bed lathe at the front of the headbox is sunken and can accommodate large diameter parts. The shape of the lathe is two-head high, low in the middle, and looks like a saddle, so it is called a saddle lathe. The saddle lathe is suitable for machining parts with large radial dimensions and small axial dimensions. It is suitable for turning the outer circle, inner hole, end face, slot and metric, inch, modulus, warp thread, and drilling and boring. , reaming and other processes, especially suitable for single-piece, batch production enterprises. The saddle lathe can process larger diameter workpieces in the saddle groove. The machine tool guides are hardened and finely ground for easy and reliable operation. The lathe has the characteristics of high power, high speed, strong rigidity, high precision and low noise.<\/p>\r\n<\/section>\r\n"}
        this.setState({o:o})
        //XAPIUtils.track(o);
    }
    handleSend = (e) => {
        console.log(this.state.o)
        XAPIUtils.track(this.state.o);
    }
    render(){
        return(
            <div>
                <div>Hello XAPI</div>
                <button type="button" onClick={(event) => this.handleSend(event)}>Submit</button>
            </div>
            
        )
    }
}

export default XapiMain;