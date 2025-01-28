import React from 'react'

function Avata({image_url, width, height}) {
    return (
        <div style={{ width: `${width}px`, height: `${height}px` }} className="rounded-full overflow-hidden">
            <img
                src={image_url}
                alt="Profile"
                className="object-cover"
            />
        </div>
    )
}

export default Avata