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

    const docs = useMemo(() => {
        if(search){
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

    }, [currentPath, path]);

    const onAddDocNew = () => {
        setModalType("new");
    }

    const handleDocForm = (data) => {
        dispatch({ type: 'add' })
    }

    const onClose = () => {
        setModalType(undefined);
    }

    const onOpenFolder = (name) => {
        const newPath = currentPath ? `${currentPath}/${name}` : name;
        dispatch({ type: 'updateCurrentPath', value: newPath })
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
                            onOpenDir={onOpenFolder} />)
                })}
                <DocCreation onCreate={onAddDocNew} />
            </section>

            <DocForm type={modalType}
                onAction={handleDocForm}
                onClose={onClose} />
        </>
    )
}

export default List;