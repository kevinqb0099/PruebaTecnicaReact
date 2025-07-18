import { useState } from "react";
import { useEffect } from "react";
import { appsettings } from "../settings/appsettings";
import { Link } from "react-router-dom"; // solo esto de react-router-dom
import Swal from "sweetalert2";
import { Container, Row, Col, Form,Table,Button } from "reactstrap";
import type { IProducto } from "../Interface/IProducto";

export function Lista(){

    const [productos,setProducto] = useState<IProducto[]>([]);

    const obtenerProducto = async()=>{
            const response = await fetch(`${appsettings.apiUrl}Products/Lista`)
              if(response.ok){
                const data = await response.json();
                setProducto(data);
             }
        }
    
    useEffect(()=>{
        obtenerProducto()
    },[])


    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                   <h4>Lista de producto</h4>
                   <hr />

                   <Link className="btn btn-success mb-3" to="/nuevoproducto">Nuevo Producto</Link>

                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productos.map((item)=>(
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                         <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.category}</td>
                                        <td>
                                             <Link className="btn btn-primary me-2" to={`/consultarproducto/${item.id}`}>Ver Detalle</Link>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </Table>

                </Col>
            </Row>
        </Container>
    )

}