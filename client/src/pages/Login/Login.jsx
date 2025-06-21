  import React, {useState, useRef} from "react";
  import InputComponent from "../../components/Input/Input";
  import Button from "../../components/Button/Button";
  import axios from 'axios'
  import {useNavigate} from 'react-router-dom'
  import {ToastContainer , toast} from 'react-toastify' ;


  export const Login = () => {

      
        const emailMessageRef = useRef()
        const passwordMessageRef = useRef()

        const navigate = useNavigate()

        const [formData, setFormData] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));

    };

      const handleSubmit = (e) => {
          e.preventDefault()
          
          axios.post('http://localhost:8081/loginUser', formData)
          .then((response) => {
            if(response.data.message == 'wrong password') {
              passwordMessageRef.current.classList.remove('hidden')
            }
            if(response.data.message == 'user not found') {
              emailMessageRef.current.classList.remove('hidden')
            }
              localStorage.setItem('token', response.data)
              toast.success('Usuário logado com sucesso!');
              passwordMessageRef.current.classList.add('hidden')
              emailMessageRef.current.classList.add('hidden')
              setTimeout(() => {
                  navigate('/')
              }, 1000);
          })
          .catch((e) => {
            console.log(e)
          })
    }
          
      return (
          <div className="w-lvw h-lvh flex items-center justify-center" >
              '<div className="w-2/4 h-full bg-red-500 hidden lg:inline-flex" ></div>
              <div className="w-4/5 lg:w-2/4 flex items-center justify-center" >
                  <form className="w-4/5 p-10 shadow-xl rounded-md flex flex-col items-center  " onSubmit={handleSubmit} >
                <div className="flex flex-col justify-center gap-1" >
                  logo
                  <h1 className="text-xl font-extrabold" >CADASTRE-SE</h1>
                  <label htmlFor="">Email:</label>
                  <InputComponent
                  name="email"
                  type="email"
                  onChange={handleChange}
                  />
                  <p className="text-red-500 font-semibold hidden" ref={emailMessageRef} >Email errado!</p>
                  <label htmlFor="">Senha:</label>
                  <InputComponent
                  name="password"
                  type="password" 
                  onChange={handleChange}
                  />
                  <p className="text-red-500 font-semibold hidden" ref={passwordMessageRef} >Senha errada!</p>
                  <Button />
                </div>
              </form>
              </div>'
          </div>
      )
  }

  export default Login