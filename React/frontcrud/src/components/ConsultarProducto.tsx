import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { appsettings } from "../settings/appsettings";
import { useNavigate, useParams } from "react-router-dom"; // solo esto de react-router-dom
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



export function ConsultarProducto(){

    const {id} = useParams<{id:string}>()
    const [producto,setProducto] = useState<IProducto>(initialProducto)
    const navigate = useNavigate()

    useEffect(()=>{

        const obtenerProducto = async()=>{
            const response = await fetch(`${appsettings.apiUrl}Products/Obtener/${id}`)
              if(response.ok){
                const data = await response.json();
                setProducto(data);
             }
        }
        obtenerProducto()
    },[])

      const inputChangeValue = (event : ChangeEvent<HTMLInputElement>)=>{

      const inputName = event.target.name;
      const inputValue = event.target.value;
      console.log(inputName,"-",inputValue);

      setProducto({...producto,[inputName]:inputValue})

    }

    
    const volver = ()=>{
        navigate("/")
    }
      

    return(
       <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Consultar Producto</h4>
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
                    
                    <Button color="secondary" onClick={volver}>Volver</Button>

                </Col>
            </Row>
        </Container>
    )

}