  import React, {useContext, useState, useEffect} from "react";
  import { AuthContext } from "../../context/UserContext";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";

  const MyProfile = () => {

        const [formData, setformData] = useState({name: "", email: ""})
        const {user} = useContext(AuthContext)
        const navigate = useNavigate()
        
        const handleClick = () => {
          localStorage.removeItem('token')
          navigate('/')
        }

        useEffect(() => {
        if (user) {
          setformData({
            name: user.username || "",
            email: user.email || ""
          });
        }
      }, [user]);

            const handleChange = (e) => {
                const {name, value} = e.target
                setformData((prev) => (
                    {
                    ...prev,
                    [name]: value
                }))
            }
        
            const handleSubmit = (e) => {
                e.preventDefault()
        
                axios.put(`http://localhost:8081/putUser/${user.id}`, formData)
                .then(() => alert("Dados atualizados!"))
                .catch(() => alert("Erro ao atualizar."));
            }

            console.log(formData)
        
      return (
          <div className="w-screen h-screen flex items-center justify-center">
                <div className="w-4/5 lg:w-2/4 flex items-center justify-center" >
                    <form className="w-4/5 p-10 shadow-xl rounded-md flex flex-col items-center " onSubmit={handleSubmit}  >
                  <div className="flex flex-col justify-center gap-1" >
                    <img src={user.image} alt="Foto de perfil" />
                    <h1 className="text-xl font-extrabold" ></h1>
                    <div className="flex gap-2">
                    <label htmlFor="">Nome:</label>
                    <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    />
                    </div>
                    <div className="flex gap-2">
                      <label htmlFor="">Email:</label>
                    <input 
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    />
                    </div>
                    <button className="p-2 bg-yellow-500 rounded-md text-white font-semibold" onClick={handleSubmit} >Atualizar dados</button>
                    <button className="p-2 bg-red-500 rounded-md text-white font-semibold" onClick={handleClick} >Deslogar</button>
                  </div>
                </form>
                </div>
          </div>
      )
  }

  export default MyProfile