import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { cargarProductosDeseados } from './actions/deseadosActions';
import ProductosView from './screens/ProductosView';

const App = () => {
    /* useEffect(() => {
        store.dispatch(cargarProductosDeseados());
    }, []); */

    return (
        <Provider store={store}>
            <ProductosView />
        </Provider>
    );
};

export default App;
