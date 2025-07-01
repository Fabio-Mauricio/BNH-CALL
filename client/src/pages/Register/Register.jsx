import React, {useRef, useState} from "react"
import InputComponent from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import FileUploader from "../../components/FileUploader/FileUploader"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const Register = () => {

      const messageRef = useRef()

      const navigate = useNavigate()

      const [file, setFile] = useState(null)
      const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    console.log(formData)
  };

  const hadleFileChange = (e) => {
    setFile(e.target.files[0])
  }

    const handleSubmit = (e) => {
        e.preventDefault()
         if (file) {
        const data = new FormData()
        data.append('file', file)
        data.append('name', formData.name)
        data.append('date_birth', formData.date_birth)
        data.append('email', formData.email)
        data.append('password', formData.password)

        axios.post('http://localhost:8081/postUser', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          //navigate('/login')
          if(response.data.message == 'Usuário já existe') {
            messageRef.current.classList.remove('hidden')
          }
          else {
            messageRef.current.classList.add('hidden')
            setTimeout(() => {
              navigate('/login')
            }, 1000)
          }
        })
        .catch((e) => {
          console.log(e)
        })
  }
  }

    return (
        <div className="w-lvw h-lvh flex items-center justify-center" >
            <div className="w-2/4 h-full bg-red-500 hidden lg:inline-flex" ></div>
            <div className="w-4/5 lg:w-2/4 flex items-center justify-center" >
                <form className="w-4/5 p-10 shadow-xl rounded-md flex flex-col items-center" onSubmit={handleSubmit} >
               <div className="flex flex-col justify-center gap-1" >
                 logo
                <h1 className="text-xl font-extrabold" >CADASTRE-SE</h1>
                <FileUploader 
                name="file"
                value={file}
                onChange={handleChange}
                setFile={setFile} />
                <label htmlFor="" className="flex items-center justify-center" >Foto de Perfil</label>
                <label htmlFor="">Nome:</label>
                <InputComponent
                name="name"
                value={formData.name}
                onChange={handleChange}  
                />
                <label htmlFor="">Data de Nascimento:</label>
                <InputComponent 
                name='date_birth'
                type="date" 
                value={formData.date_birth}
                onChange={handleChange} 
                />
                <label htmlFor="">Email:</label>
                <InputComponent 
                name='email'
                type="email" 
                value={formData.email}
                onChange={handleChange} 
                />
                <p className="text-red-500 font-semibold hidden" ref={messageRef} >Email já registrado!</p>
                <label htmlFor="">Senha:</label>
                <InputComponent 
                name='password'
                type="password" 
                value={formData.password}
                onChange={handleChange}
                />
                <Button />
               </div>
            </form>
            </div>
        </div>
    )
}

export default Register