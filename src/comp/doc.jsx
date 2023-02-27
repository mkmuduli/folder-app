import file from '../asset/file.png';
import folder from '../asset/folder.png';
import { useCallback, useEffect } from 'react';
import { OutSideClick } from './outSideClick';
import useMenu from './useMenu';

const Doc = ({ type, name, onOpenDir, dir }) => {
    const { closeMenu, menuActive, handleContextMenu, contextMenu } = useMenu();

    const onClickMenu = useCallback((menuItem) => {
        console.log(menuItem);
    }, []);

    useEffect(() => {
        contextMenu.current.setMenu([
            {
                label: "Copy",
                click: onClickMenu
            },
            {
                label: "Rename",
                click: onClickMenu
            },
            {
                label: "Delete",
                click: onClickMenu
            }
        ]);
    }, [onClickMenu, contextMenu]);


    const onOutsideClick = () => {
        closeMenu()
    }

    const openDir = () => {
        onOpenDir(dir)
    }

    return (
        <OutSideClick onClickOutside={onOutsideClick} active={menuActive} className="doc-outside" >
            <section className='doc-ele'
                onContextMenu={handleContextMenu}
                onClick={type === "file" ? undefined : openDir}>
                <img src={type === "file" ? file : folder} alt="Document" />
                <span className='doc-name' >{name}</span>
            </section>
        </OutSideClick>
    )
}

export default Doc;



