import React from "react";
import Input from './Input.style'

const InputComponent = ({name, value, onChange, type,}) => {
    return (
        <div>
            <Input
            name={name}
            value={value}
            onChange={onChange}
            type={type}  />
        </div>
    )
}

export default InputComponent