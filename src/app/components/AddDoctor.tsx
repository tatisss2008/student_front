

//importaciones

import { useEffect, useState } from "react"

interface Especialidad{
    description:string;
    id:number;    
    _links: Record<string, {href:string}>
}

//crear la funcion

const PlusIcon= ()=>{
    const [especialidades, setEspecialidades]= useState<Especialidad[]>([])
    const [abierto, setAbierto]= useState(false)
    const [datosFormulario, setDatosFormulario]=useState(
        {            
            "idDoc":"",
            "name":"",
            "lastName":"",
            "email":"",
            "mobile":"",
            "consultorio": ""             
        }
    )

    //Manejadores de eventos
    const clickIcon=()=>{
        setAbierto(!abierto)
    }
    
    const cambiarValor=(e:any)=>{
        setDatosFormulario({
            ...datosFormulario,
            [e.target.name]:e.target.value
        })
    }

    const procesarFormulario= async (e:any)=>{
    e.preventDefault()
      
        //Manejar el formulario
        try{
            const response = await fetch ('http://localhost:9090/doctores',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(datosFormulario)

            }
            )

            if(!response.ok){
                throw new Error("No se pudo guardar")
            }

            setAbierto(false)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(
        ()=>{
            const fetchPrograms= async()=>{
                try{
                    const response=await fetch("http://localhost:9090/especialidades")
                    const data=await response.json()
                    setEspecialidades(data._embedded.especialidades)

                }catch(error){
                    console.error(error)
                }
            };
            
            fetchPrograms();
            
        },[]
    )
    
    //estructura JSX del componente
    return (
        <div>
            <div onClick={clickIcon}>
                {/* <span> ADD </span> */}
                <span><a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Add </a></span>
                <p>.</p>
            </div>
            {abierto &&(
                <form onSubmit={procesarFormulario}>
                {/* <form> */}
                <input
                        type="text"
                        name= "idDoc"
                        placeholder="Identificación"
                        onChange={cambiarValor}
                    />
                    <input
                        type="text"
                        name= "name"
                        placeholder="Nombre"
                        onChange={cambiarValor}
                    />
                    <input
                        type="text"
                        name= "lastName"
                        placeholder="Apellidos"
                        onChange={cambiarValor}
                    />
                    <input
                        type="email"
                        name= "email"
                        placeholder="Correo Electrónico"
                        onChange={cambiarValor}
                    />
                    <input
                        type="text"
                        name= "mobile"
                        placeholder="Celular"
                        onChange={cambiarValor}
                    />
                    <input
                        type="text"
                        name= "consultorio"
                        placeholder="N° de Consultorio"
                        onChange={cambiarValor}
                    />
                    <select name="especialidad">
                        <option key="0" value="">Seleccione un programa </option>
                        {
                            especialidades.map(
                                (especialidad)=>(                            
                                    <option key={especialidad.id} value={especialidad._links.especialidad.href}>
                                        {especialidad.description}
                                    </option>
                                    ))                    
                        }
                    </select>
                    {/* <button type="submit"> Guardar </button> */}
                    <button type="submit" className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-green-900"> Guardar </button>
                </form>
            )
            }
        </div>
    )

}

export default PlusIcon

