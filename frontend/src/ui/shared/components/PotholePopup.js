import React from 'react'

export function PotholePopup(props) {
    const {pothole} = props

    return (
        <>
            <div>
                {pothole.potholeDescription}
            </div>
        </>
    )
}
