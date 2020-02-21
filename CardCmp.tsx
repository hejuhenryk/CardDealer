import React, { useState } from 'react'
import styled from 'styled-components'

type CardCmpProps = {
    src: string;
    value: string | number;
    type: string;
}

const CardImg = styled.img<{transform: string}>`
    position: absolute;
    display: inline-block;
    height: 40vh;
    left: 50vw;
    top: 30vh;
    transform-origin: top left;
    transform: ${p=>p.transform};
`

export const CardCmp: React.FC<CardCmpProps> = ({src, value, type}) => {
    const [transform] = useState(`rotate(${Math.random()*90-45}deg)  translate(-${50-(Math.random()*10-5)}%, -${50-(Math.random()*10-5)}%)`);
    return (
        <CardImg transform={transform} src={src} alt={`${value} of ${type}`}/>
    )
}
