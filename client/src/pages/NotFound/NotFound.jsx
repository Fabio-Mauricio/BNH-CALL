import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center" >
            <img src="/images/gif-not-found.gif" alt="Macaco pulado" className="w-60" />
           <h1 className="text-4xl font-bold"> Página não encontrada</h1>
           <Link to={"/"} className="block rounded-md text-2xl hover:underline underline-offset-8" >Voltar para o ínicio</Link>
        </div>
    )
}

export default NotFound