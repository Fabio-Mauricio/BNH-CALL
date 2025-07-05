import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="bg-stone-800 flex flex-col md:flex-row justify-around mt-5 p-5 text-white gap-2" >
            <ul>
                <li>Logo</li>
                <li>© Todos os direitos reservados ao criador do sistema: Fabio do Monte Maurício</li>
            </ul>
            <ul className="text-white">
                <li className="font-medium" >Páginas</li>
                <Link to={"/"} className=" block rounded-md text-base " >Home</Link>
                <Link to={"/Contato"} className="block  rounded-md text-base " >Contato</Link>
                <Link to={"/Videochamada"} className=" block rounded-md text-base " >Videochamada</Link>
            </ul>
        </div>
    )
}

export default Footer