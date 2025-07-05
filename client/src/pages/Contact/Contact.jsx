import React, {useState, useRef} from "react";
import InputComponent from "../../components/Input/Input"
import Button from "../../components/Button/Button";
import emailjs from "@emailjs/browser"

const Contact = () => {

    const [formData, setFormData] = useState({});

      const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));

      console.log(formData)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const templateParams = {
            email: formData.email,
            message: formData.message
        }
        emailjs.send('service_5bje4ml', 'template_uuw9b6s', templateParams, 'FW0eos2HSAjY-dlSl')
        .then((response) => {
            console.log('Email enviado!') 
        }, (err) => {
            console.log(err )
        })
        
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <form className="shadow-lg w-9/12 md:w-4/12 flex flex-col items-center justify-center p-5" onSubmit={handleSubmit} >
                <h1 className="text-2xl font-bold">CONTATO</h1>
                 <label htmlFor="">Email:</label>
                  <InputComponent
                  name="email"
                  type="email"
                  onChange={handleChange}
                  />
                  <label htmlFor="">Mensagem:</label>
                  <textarea name="message" onChange={handleChange} style={{backgroundColor: '#f2ddfe', borderRadius: '4px', padding: 20}}>

                  </textarea>
                  <Button onSubmit={handleSubmit} />
            </form>
        </div>
    )
}

export default Contact