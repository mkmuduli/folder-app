import { createContext, useContext, useReducer } from 'react';
import { pathReducer } from './pathReducer';

const PathValueContext = createContext({});
const PathDispatchContext = createContext({});


const PathContext = ({ children }) => {

    const [state, dispatch] = useReducer(pathReducer, {
        path: {
            dir1: {},
            // eslint-disable-next-line 
            ['file.js']: false,
        },
        currentPath: null,
        search: '',
    });

    return (
        <PathValueContext.Provider value={state}>
            <PathDispatchContext.Provider value={dispatch} >
                {children}
            </PathDispatchContext.Provider>
        </PathValueContext.Provider>
    )
}

export default PathContext;


export const usePathValue = () =>{
    return useContext(PathValueContext);
}

export const usePathDispatch = () =>{
    return useContext(PathDispatchContext);
}