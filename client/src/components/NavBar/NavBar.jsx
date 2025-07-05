import React, {useRef, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";

const NavBar = () => {

  const {user} = useContext(AuthContext)

    const menuRef = useRef()

    const handleClick = () => {
        menuRef.current.classList.toggle('hidden')
    }
  
    return (
        <div>
    <nav className="bg-white shadow-md mb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <a href="#">
            <img className="h-8 w-8 rounded-full" src="./images/b82ecbb4abfe765876c50bcf32ab9bba.svg" alt="Logo" />
          </a>
        </div>
         <div className="flex items-center">  
          <div className="hidden md:flex space-x-4">
            <Link to={'/'} className="text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600">Home</Link>
            <Link to={'/Sobre'} className="text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600">Sobre</Link>
            <Link to={'/Contato'} className="text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600">Contato</Link>
            <Link to={'/Videochamada'} className="text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600">Vídeochamada</Link>
            <Link to={'/blog'} className="text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600">Blog</Link>

          </div>
        </div>

          <div className=" md:flex space-x-4">
              <div className="flex items-center gap-2">
       {
         user && user.username ? (
          <Link to={"/meuPerfil"} ><h1>Olá, {user.username}!</h1></Link>
        ) : (
          <div className="hidden md:flex gap-2">
            <Link to={"/Login"} className="text-white px-3 py-2 hover:bg-violet-500 bg-violet-600 rounded-md text-sm font-medium hover:bg-gray-700">Login</Link>
            <Link to={"/Cadastro"} className="text-white px-3 py-2 hover:bg-violet-500 bg-violet-600 rounded-md text-sm font-medium hover:bg-gray-700">Cadastro</Link>
          </div>
        )
       }    
         </div>
          </div>
          <div className="flex md:hidden">
            <button type="button" onClick={() => handleClick()} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-violet-500 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 easy-in-out" aria-label="Menu" aria-expanded="false" > 
              <svg className="h-6 w-6" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16">
                </path>
              </svg>
            </button>
          </div>
      
      </div>
      <div ref={menuRef} className="hidden md:hidden" >
        <div className="px-2 pt-2 pd-3 sm:px-12 py-12">
          <Link to={"/"} className="hover:bg-gray-600 text-black block px-3 py-2 rounded-md text-base font-medium" >Home</Link>
          <Link to={"/Contato"} className="hover:bg-gray-600 text-black block px-3 py-2 rounded-md text-base font-medium" >Contato</Link>
          <Link to={"/Videochamada"} className="hover:bg-gray-600 text-black block px-3 py-2 rounded-md text-base font-medium" >Videochamada</Link>
           <div className="flex items-center gap-2">
       {
         user && user.username ? (
          <p></p>
        ) : (
          <div className="flex flex-col gap-2">
            <Link to={"/Login"} className="text-white px-3 py-2 hover:bg-violet-500 bg-violet-600 rounded-md text-sm font-medium hover:bg-gray-700">Login</Link>
            <Link to={"/Cadastro"} className="text-white px-3 py-2 hover:bg-violet-500 bg-violet-600 rounded-md text-sm font-medium hover:bg-gray-700">Cadastro</Link>
          </div>
        )
       }    
         </div>
        </div>  
      </div>
    </div>
  </nav>
        </div>
    )
}

export default NavBar;