import file from '../asset/file.png';
import folder from '../asset/folder.png';
import { useEffect } from 'react';
import useMenu from './useMenu';

const Doc = ({ type, name, onOpenDir, dir, onEditDoc, onDeleteDoc }) => {
    const { handleContextMenu, contextMenu } = useMenu();

    const onClickMenu = (menuItem) => {
        switch (menuItem.label) {
            case 'Rename':
                onEditDoc({ name, dir, type })
                break;
            case 'Delete':
                onDeleteDoc({ name, dir })
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        contextMenu.current.setMenu([
            // {
            //     label: "Copy",
            //     click: onClickMenu
            // },
            {
                label: "Rename",
                click: onClickMenu
            },
            {
                label: "Delete",
                click: onClickMenu
            }
        ]);
        // eslint-disable-next-line
    }, [contextMenu]);


    const openDir = () => {
        onOpenDir(dir? `${dir}/${name}`: name)
    }

    return (
        <section className='doc-ele'
            onContextMenu={handleContextMenu}
            onClick={type === "file" ? undefined : openDir}>
            <img src={type === "file" ? file : folder} alt="Document" />
            <span className='doc-name' >{name}</span>
        </section>
    )
}

export default Doc;



