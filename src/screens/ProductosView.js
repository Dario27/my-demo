
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {endpointApiUrl} from '../reducers/Api';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


const ProductosView = () => {
    const [productos, setProductos] = useState([]);
    const [promedio, setPromedio] = useState([]);
    const dispatch = useDispatch();

    React.useEffect(() =>{
        buscarProductos()
        console.log(productos)
    },[])

    const buscarProductos = async () => {
        const  baseurl = endpointApiUrl
        try {
         await axios.get(baseurl+'/api/productos?categoriaId=1')
         .then((data)=>{
            setProductos(data.data)
            console.log("data processed => " + JSON.stringify(data.data));
         });
        } catch (error) {
            console.error(error);
        }
    };

    const styles = {
        header: {
          backgroundColor: '#f2f2f2',
          padding: '10px',
          border: '1px solid #ddd',
        },
        row: {
          textAlign: 'center',
          border: '1px solid #ddd',
        },
        cell: {
          padding: '10px',
          border: '1px solid #ddd',
        },
      };

      const updateFavorito = async (productoId) => {
        const  baseurl = endpointApiUrl
        const response = await fetch(baseurl+`/api/productos/${productoId}/favorito`, {
          method: 'PUT',
        });
      
        if (response.ok) {
          const data = await response.json();
          console.log('Producto actualizado:', data);
        } else {
          console.error('Error al actualizar el producto');
        }
      };
      
      const toggleFavorito = (productoId) => {
        // Actualizamos solo el producto que coincide con productoId
        const nuevosProductos = productos.map((producto) =>
          producto.productoId === productoId
            ? { ...producto, isFavorito: !producto.isFavorito } 
            : producto
        );
        updateFavorito(productoId)
        setProductos(nuevosProductos); 
      };

    return (
        <div>
            <Box component="section" >
                <Button   title="Buscar productos"/>
                <Typography
                    variant='h3'>Listado de Productos</Typography>
                    <Paper sx={{ height: "auto", width: '100%' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                            <th style={styles.header}>ID</th>
                            <th style={styles.header}>Name</th>
                            <th style={styles.header}>precio</th>
                            <th style={styles.header}>Categorias</th>
                            <th style={styles.header}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            productos.map((item)=>(
                                <tr key={item.productoId} style={styles.row}>
                                    <td style={styles.cell}>{item.productoId}</td>
                                    <td style={styles.cell}>{item.nombre}</td>
                                    <td style={styles.cell}>{item.precio}</td>
                                    <td style={styles.cell}>{item.categoriaId}</td>
                                    <td>
                                            <Button 
                                                style={{
                                                    backgroundColor:"blue",
                                                    color:"white"
                                                }}
                                                 onClick={() => toggleFavorito(item.productoId)} 
                                            >
                                                 {!item.isFavorito ? "Agregar Favorito" : "Quitar Favorito"}
                                            </Button>
                                        </td>
                                </tr>
                            )  )
                        }
                        </tbody>
                        </table>
                    </Paper>
            </Box>
        </div>
    );
};

export default ProductosView;
