import React from 'react'
import './App.css'
export default function Icon(props) {
    return (
        <div>
            <a href={props.link} style={{ marginTop: '5px', padding: '15px', paddingRight: '0px'}} className=" techIcon" ><img className="techIcon" style={{ width: 'auto', height: '35px' }} src={props.image}></img></a>
        </div>
    )
}
