import AsyncStorage from '@react-native-async-storage/async-storage';

// Acción para agregar producto deseado
export const agregarProductoDeseado = (producto) => async (dispatch) => {
    try {
        let productosDeseados = await AsyncStorage.getItem('productosDeseados');
        productosDeseados = productosDeseados ? JSON.parse(productosDeseados) : [];
        productosDeseados.push(producto);
        await AsyncStorage.setItem('productosDeseados', JSON.stringify(productosDeseados));
        dispatch({ type: 'AGREGAR_PRODUCTO_DESEADO', payload: producto });
    } catch (error) {
        console.error(error);
    }
};

// Acción para eliminar producto deseado
export const eliminarProductoDeseado = (productoId) => async (dispatch) => {
    try {
        let productosDeseados = await AsyncStorage.getItem('productosDeseados');
        productosDeseados = productosDeseados ? JSON.parse(productosDeseados) : [];
        productosDeseados = productosDeseados.filter(p => p.id !== productoId);
        await AsyncStorage.setItem('productosDeseados', JSON.stringify(productosDeseados));
        dispatch({ type: 'ELIMINAR_PRODUCTO_DESEADO', payload: productoId });
    } catch (error) {
        console.error(error);
    }
};

// Acción para cargar productos deseados
export const cargarProductosDeseados = () => async (dispatch) => {
    try {
        let productosDeseados = await AsyncStorage.getItem('productosDeseados');
        productosDeseados = productosDeseados ? JSON.parse(productosDeseados) : [];
        dispatch({ type: 'CARGAR_PRODUCTOS_DESEADOS', payload: productosDeseados });
    } catch (error) {
        console.error(error);
    }
};
