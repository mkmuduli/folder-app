import '@axframe/contextmenu/dist/style.css';
import { ContextMenu } from "@axframe/contextmenu";
import { useRef, useState, useCallback, useEffect } from 'react';

const useMenu = () => {

    const contextMenu = useRef(
        new ContextMenu({
            id: "basic",
            style: { fontSize: "12px", minWidth: "100px", backgroundColor: '#fff' },
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            const ele = document.querySelectorAll(`[data-rf-contextmenu-container]`);
           
            if (ele && ele && !ele[0].contains(event.target)) {
                closeMenu()
            }
        };
        if (menuActive) {
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [menuActive, closeMenu]);

    return { handleContextMenu, contextMenu }
}

export default useMenu;