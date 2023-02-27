import { useMemo, useState } from "react";
import { usePathDispatch, usePathValue } from "../context/path.context";
import { getCurrentFolder } from "../context/pathReducer";
import DocForm from "./cardForm";
import Doc from "./doc";
import DocCreation from "./docCreation";


const List = () => {
    const { path, currentPath, search } = usePathValue();

    const dispatch = usePathDispatch();

    const [modalType, setModalType] = useState();

    const [editedDoc, setEditedDoc] = useState('');

    const docs = useMemo(() => {
        if (search) {
            return [];
        }
        const currentDir = getCurrentFolder(path, currentPath);

        const docs = Object.keys(currentDir).map(eachDoc => {
            return {
                name: eachDoc,
                type: currentDir[eachDoc] ? 'folder' : 'file',
                dir: eachDoc,
            }
        })
        return docs;

    }, [currentPath, path, search]);

    const onAddDocNew = () => {
        setModalType("new");
    }

    const handleDocForm = (data) => {
        return new Promise((resolve) => {
            dispatch({
                type: modalType === 'new' ? 'add' : 'update',
                name: data.fileName,
                fileType: data.fileType,
                oldName: data.oldName,
            })
            setModalType(undefined);
            if (modalType === 'edit') setEditedDoc('');
            resolve();
        })

    }

    const onClose = () => {
        if (modalType === 'edit') setEditedDoc('');
        setModalType(undefined);
    }

    const onOpenFolder = (name) => {
        const newPath = search ? name : currentPath ? `${currentPath}/${name}` : name;
        dispatch({ type: 'updateCurrentPath', value: newPath });
    }

    const handleDeleteDoc = (data) => {
        dispatch({ ...data, type: 'delete' })
    }

    const handelEditDoc = (data) => {
        setEditedDoc(data);
        setModalType("edit");
    }

    return (
        <>
            <section className="doc-block" >
                {docs.map((eachDoc) => {
                    return (
                        <Doc key={eachDoc.name}
                            type={eachDoc.type}
                            name={eachDoc.name}
                            dir={eachDoc.dir}
                            onOpenDir={onOpenFolder}
                            onEditDoc={handelEditDoc}
                            onDeleteDoc={handleDeleteDoc} />)
                })}
                {!search ? <DocCreation onCreate={onAddDocNew} /> : false}
            </section>

            <DocForm type={modalType}
                onSubmit={handleDocForm}
                onClose={onClose}
                fileData={editedDoc} />
        </>
    )
}

export default List;