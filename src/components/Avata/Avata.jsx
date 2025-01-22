import React from 'react'

function Avata({width, height}) {
    return (
        <div style={{ width: `${width}px`, height: `${height}px` }} className="rounded-full overflow-hidden">
            <img
                src="/Avata.jpg"
                alt="Profile"
                className="object-cover"
            />
        </div>
    )
}

export default Avata