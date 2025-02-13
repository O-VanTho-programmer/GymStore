import React from 'react'

function ButtonSmall({ icon: Icon, text, onClick }) {
    return (
        <button onClick={onClick} className='flex items-center gap-2 p-2 border border-black rounded-lg hover:bg-black hover:text-white w-fit whitespace-nowrap'>
            {Icon && <Icon />} {text}
        </button>
    )
}

export default ButtonSmall