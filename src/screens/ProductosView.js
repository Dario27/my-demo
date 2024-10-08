
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { View, Text, Button, FlatList } from 'react-native';
//import { agregarProductoDeseado } from '../actions/deseadosActions';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {endpointApiUrl} from '../reducers/Api';


const ProductosView = () => {
    const [productos, setProductos] = useState([]);
    const dispatch = useDispatch();

    React.useEffect(() =>{
        const buscarProductos = async () => {
            const  baseurl = endpointApiUrl
            try {
                const response = await axios.get(baseurl+'/api/productos?categoriaId=1');
                setProductos(response.data);
                console.log("data processed => " + JSON.stringify(response.data));
                console.log(productos)
            } catch (error) {
                console.error(error);
            }
        };
        buscarProductos()
    },[])
    

    const columns = [
        { field: 'productoId', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nombre Producto', width: 130 },
        { field: 'precio', headerName: 'Precio', width: 130 },
        { field: 'categoriaId', headerName: 'Categoria', width: 90 }
      ];

    return (
        <div>
            <Box component="section" >
            <Button 
             title="Buscar productos"/>
             <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={productos}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
                </Paper>            
            {/* <FlatList
                data={productos}
                keyExtractor={item => item.productoId}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nombre}</Text>
                         <Button title="Agregar a deseados"  /> 
                    </View>
                )}
            /> */}
        </Box>
        </div>
    );
};

export default ProductosView;
