import React from 'react';
import Notes from "./Notes";
import NotesMobile from './notes-mobile.component';
import Utils from '../../../_helpers/utils'


const NotesForwarding = ({id})=>{
    let isMobile = Utils.isMobileDevice();
    if(isMobile){
        return <NotesMobile id={id} />
    }else{
        return <Notes id={id}/>
    }
}

export default NotesForwarding;