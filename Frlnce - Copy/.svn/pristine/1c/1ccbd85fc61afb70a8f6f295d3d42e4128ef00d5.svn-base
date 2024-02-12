import axios from 'axios';
import Config from '../../_config/config';
class XAPIUtils {
    static createStatement = (obj) => {
        var statement = {
            "actor": {
                "name": obj.lrsConfig.userName,
                "account": {
                    "homePage": "http://www.edusquares.org",
                    "name": obj.lrsConfig.userName
                }
            },
            "object": {
                "id": obj.lrsConfig.accessUrl,
                "definition": {
                    "name": {"en-US": obj.name},
                    "description": {"en-US": obj.name,}
                },
                "objectType": "Activity"
            }
        }
        statement["verb"] = this.findVerb(obj.typeId);
       return statement;
    }
    static verbs = {"initialized":{"id":"http://edusquares.com/xapi/verbs/initialized","display":{"en-US":"Video Initialized"}},"played":{"id":"http://edusquares.com/xapi/verbs/played","display":{"en-US":"Video Played"}},"paused":{"id":"http://edusquares.com/xapi/verbs/paused","display":{"en-US":"Video Paused"}},"ended":{"id":"http://edusquares.com/xapi/verbs/ended","display":{"en-US":"Video Ended"}},"accessed":{"id":"http://edusquares.com/xapi/verbs/accessed","display":{"en-US":"Resource Accessed"}},"read":{"id":"http://edusquares.com/xapi/verbs/read","display":{"en-US":"Resource Read"}},"viewed":{"id":"http://edusquares.com/xapi/verbs/viewed","display":{"en-US":"ResourceViewed"}},"downloaded":{"id":"http://edusquares.com/xapi/verbs/downloaded","display":{"en-US":"Resource Downloaded"}},"started":{"id":"http://edusquares.com/xapi/verbs/started","display":{"en-US":"Test Started"}},"completed":{"id":"http://edusquares.com/xapi/verbs/completed","display":{"en-US":"Test Completed"}},"resumed":{"id":"http://edusquares.com/xapi/verbs/resumed","display":{"en-US":"Test Resumed"}}}
    static findVerb = (typeId) => {
        switch(typeId){
            case 16:
                return this.verbs.initialized;
            case 6:
                return this.verbs.viewed;
            case -1:
                return this.verbs.started;
            case -2:
                return this.verbs.resumed;
            case -3:
                return this.verbs.read;
            case -4:
                return this.verbs.downloaded;
            case -5:
                return this.verbs.played;
        }
        return this.verbs.accessed;
    }

    static track = (obj) => {
        let conf = obj.lrsConfig;
        var statement = this.createStatement(obj);
        if(obj.hasOwnProperty("ext")){
            statement["result"] = obj.ext.result;
            statement["context"] = obj.ext.context;
        }
        console.log("SENDING for LRS")
        this.trackkLrs(conf, statement).then((response) => {
            console.log(response);
        });
        console.log("SENDING for ANALYTICS")
        this.trackLearningAnalytics(statement).then((response) => {
          console.log(response);  
        })
    }
    static trackkLrs = (conf,statement) => {
        if(conf.enabled){
            try{
                window.ADL.XAPIWrapper.changeConfig(conf.config);
                var result = window.ADL.XAPIWrapper.sendStatement(statement);
            }
            catch(err){
                console.log("FAILED TO CONNECT TO LSR ENDPOINT")
            }
        }
        else{
            console.log("XAPI NOT CONFIGURED")
        }
        console.log(statement);
        var response ={message:"success",obj:statement}
        return Promise.resolve(response);
    }

    static trackLearningAnalytics = (obj) => {
        let res = axios.post(Config.siteUrl+'api/studyresources/learning/track/', obj);
        let data = res.data;
        var response ={message:"success",obj:data}
        return Promise.resolve(response);
    }
}
export default XAPIUtils;