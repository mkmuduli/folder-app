import { Fragment, useMemo } from "react";
import { usePathValue, usePathDispatch } from "../context/path.context";

const Path = () => {
    const { currentPath, search } = usePathValue();
    const dispatch = usePathDispatch();

    const dir = useMemo(() => {
        if (!currentPath) return [".root"];
        const temp = currentPath.split('/');
        temp.unshift('.root');
        return temp;
    }, [currentPath])

    const handleBackParent = () => {
        if (currentPath) {
            const newPath = currentPath.split('/');
            newPath.pop();
            dispatch({ type: 'updateCurrentPath', value: newPath.join("/") })
        }
    }

    const clearSearch = () => {
        dispatch({ type: 'updateSearch', value: '' });
    }

    const handlePathClick = (index) => {
        let newPath = "";
        if (index !== 0) {
            const dir = currentPath.split('/');
            let i = 0;
            while (i < index) {
                newPath += `${newPath? '/':''}${dir[i]}`;
                i++;
            }
        }
        dispatch({ type: 'updateCurrentPath', value: newPath })
    }

    return (
        <section className="path-block" >
            {search ?
                <>
                    <span onClick={clearSearch} className="path-icon" >&#215;</span>
                    <span>Search Page: type atleast 1 character</span>
                </>
                : <>
                    <span className="path-icon"
                        onClick={Boolean(currentPath) ? handleBackParent : undefined}
                        disabled={Boolean(currentPath)} >&#8593;</span>
                    {dir.map((eachDir, i) => {
                        if (i === 0)
                            return <span key={i}
                                onClick={() => handlePathClick(i)}
                                className="path-ele" >{eachDir}</span>
                        else {
                            return (
                                <Fragment key={i} >
                                    <span className="path-separator" >/</span>
                                    <span onClick={() => handlePathClick(i)} className="path-ele" >{eachDir}</span>
                                </Fragment>
                            )
                        }
                    })}
                </>}
        </section>
    )
}

export default Path;