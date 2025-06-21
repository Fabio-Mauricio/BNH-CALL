import React from "react"

const Card = ({icon, title, describe, image}) => {
    return (
         <div className="w-4/5 p-10 lg:w-96 shadow-md bg-white rounded flex flex-col items-center gap-2" >
            <i className="text-6xl" >{icon}</i>
            <img src={image} alt={image} className="w-48" />
            <h2 className="text-2xl font-semibold" >{title}</h2>
            <p>{describe}</p>
        </div>
    )
}

export default Card