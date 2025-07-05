import LogoSlider from "../../components/LogoSlider/LogoSlider"
import Card from "../../components/Card/Card"
import { MdAttachEmail } from "react-icons/md";
import { FaPen, FaGear, FaUser } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";

const Home = () => {
    return (
        <>
        <div className="flex justify-center" >
           <div className="w-5/6 flex flex-col md:flex-row justify-around gap-4 " > 
            <div className=" w-full " >
                <div 
                style={{backgroundImage: `url('/images/homem-olhando-tela.webp')` }} 
                className="bg-cover bg-center bg-no-repeat bg-contain rounded-sm w-full h-96" 
                ></div>
            </div>
            <div className="w-full md:w-92 lg:w-full" >
                <p className="text-3xl text-center lg:text-left md:text-left md:text-5xl lg:text-6xl ml-5" >Realize suas videochamadas de forma descomplicada e com <span className="text-violet-600 font-semibold" >eficiência</span></p>
            </div>
           </div>
        </div>
        <div className=" flex justify-center mt-10 text-3xl bg-violet-500 font-semibold text-white p-3" >
            <h1>Empresas Colaboradoras </h1>
        </div>
        <LogoSlider />
          <div className="flex justify-center" >
           <div className="w-5/6 flex flex-col md:flex-col gap-4 " > 
            <div className=" w-full" >
                <div 
                style={{backgroundImage: `url('/images/homem-olhando-tela.webp')` }} 
                className="bg-cover bg-center bg-no-repeat bg-contain rounded-sm w-full h-96" 
                ></div>
            </div>
            <div className="w-full md:w-92 lg:w-full flex flex-col md:flex-col lg:flex-col items-center " >
                <h1 className="font-extrabold text-violet-500 text-3xl">BNH<span className="font-semibold text-black" > VIDEOCALL</span></h1> 
                <div className="w-full flex flex-col lg:flex-row gap-12 items-center mt-10">
                    <Card icon={<MdAttachEmail />} title='Contato por email' describe='Tenha um suporte via email, que ajudará você com suas dúvidas ou problemas' />
                    <Card icon={<FaPen />} title='Blog do Sistema ' describe='Se mantenha informado sobre novidades sobre o nosso sistema, entre outras coisas' />
                    <Card icon={<FaGear />} title='Manual de uso ' describe='Tenha um guia para que você consiga aprender como utilizar o sistema' />
                </div>
            </div>
           </div>
        </div>
        <div className=" flex justify-center mt-10 text-3xl bg-violet-500 font-semibold text-white p-3" >
            <h1>Tecnologias Utilizadas </h1>
        </div>
         <div className="flex justify-center" >
           <div className="w-5/6 flex" > 
            <div className="w-full flex flex-wrap flex-col md:flex-col lg:flex-row items-center gap-12 mt-10 " >
                    <Card image={'/images/logos/Tailwind_CSS_Logo.svg.png'} title={'TailwindCSS'} describe={'Utilizado para estilização do sistema'} />
                     <Card image={'/images/logos/React-icon.svg.png'} title={'ReactJS'} describe={'Utilizado para o desenvolvimento do frontend do sistema'} />
                      <Card image={'/images/logos/nodejs-logo-adesivo-sticker.png'} title={'NodeJS'} describe={'Utilizado para o desenvolvimento do backend do sistema'} />
                       <Card image={'/images/logos/download.png'} title={'MySQL'} describe={'Utilizado como banco de dados do sistema'} />
                </div>
            </div>
           </div>
        </>
    )
}

export default Home