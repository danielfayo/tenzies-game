import React from 'react'

export default function Die(props) {

    

    return(
        <div onClick={props.onClick} className={props.isHeld === true ? 'isHeld' : 'die-face'}>
            <h4>{props.value}</h4>
        </div>
    )
}
