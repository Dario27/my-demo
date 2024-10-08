
const initialState = {
    productosDeseados: []
};

export default function deseadosReducer(state = initialState, action) {
    switch (action.type) {
        case 'AGREGAR_PRODUCTO_DESEADO':
            return {
                ...state,
                productosDeseados: [...state.productosDeseados, action.payload]
            };
        case 'ELIMINAR_PRODUCTO_DESEADO':
            return {
                ...state,
                productosDeseados: state.productosDeseados.filter(p => p.id !== action.payload)
            };
        case 'CARGAR_PRODUCTOS_DESEADOS':
            return {
                ...state,
                productosDeseados: action.payload
            };
        default:
            return state;
    }
}
