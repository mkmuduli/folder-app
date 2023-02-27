import '@axframe/contextmenu/dist/style.css';
import { ContextMenu } from "@axframe/contextmenu";
import { useRef, useState, useCallback } from 'react';

const useMenu = () => {

    const contextMenu = useRef(
        new ContextMenu({
            id: "basic",
            style: { fontSize: "12px", minWidth: "100px", backgroundColor: '#fff' }
        })
    );

    const [menuActive, setMenuActive] = useState(false);

    const closeMenu = useCallback(() => {
        setMenuActive(false);
        contextMenu.current.close();
    }, []);

    const handleContextMenu = useCallback(
        (e) => {
            e.preventDefault();
            setMenuActive(true);
            contextMenu.current.popup({
                x: e.pageX,
                y: e.pageY
            });
        }, []
    );

    return { handleContextMenu, menuActive, closeMenu, contextMenu }
}

export default useMenu;