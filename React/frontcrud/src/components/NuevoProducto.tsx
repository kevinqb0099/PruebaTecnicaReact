import { useState } from "react";
import type { ChangeEvent } from "react";
import { appsettings } from "../settings/appsettings";
import { useNavigate } from "react-router-dom"; // solo esto de react-router-dom
import Swal from "sweetalert2";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import type { IProducto } from "../Interface/IProducto";



const initialProducto ={
    id:0,
    name:"",
    description:"",
    price:0,
    category:""
}



export function NuevoProducto(){

    const [producto,setProducto]=useState<IProducto>(initialProducto);
    const navigate = useNavigate();

    const inputChangeValue = (event : ChangeEvent<HTMLInputElement>)=>{

      const inputName = event.target.name;
      const inputValue = event.target.value;
      console.log(inputName,"-",inputValue);

      setProducto({...producto,[inputName]:inputValue})

    }

     const guardar = async()=>{
       const response = await fetch(`${appsettings.apiUrl}Products/Nuevo`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(producto)
       })

       if(response.ok){
             navigate("/")
       }else{
            Swal.fire({
                title:"Error!",
                text:"No se pudo guardar el producto",
                icon:"warning"
            });
       }

       console.log(producto);

    }


    const volver = ()=>{
        navigate("/")
    }


    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Nuevo Producto</h4>
                    <hr />

                    <Form>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="name" onChange={inputChangeValue} value={producto.name}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Descripción</Label>
                            <Input type="text" name="description" onChange={inputChangeValue} value={producto.description}/>
                        </FormGroup>
                         <FormGroup>
                            <Label>Precio</Label>
                            <Input type="number" name="price" onChange={inputChangeValue} value={producto.price}/>
                        </FormGroup>
                         <FormGroup>
                            <Label>Categoria</Label>
                            <Input type="text" name="category" onChange={inputChangeValue} value={producto.category}/>
                        </FormGroup>
                    </Form>

                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>

                </Col>
            </Row>
        </Container>
    )

}