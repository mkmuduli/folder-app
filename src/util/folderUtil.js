export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export const getCurrentFolder = (path, currentPath) => {
    if (!currentPath) return path;
    const dir = currentPath.split("/");
    let currentDir = path;
    dir.forEach((eachDir) => {
        currentDir = currentDir[eachDir];
    })
    return currentDir;
}

const findInFolder = (path, str, parentPath, arr) => {
    const childDoc = Object.keys(path);
    childDoc.forEach((eachChildDoc) => {
        if(eachChildDoc.includes(str)) {
            arr.push({
                name: eachChildDoc,
                type: path[eachChildDoc] ? 'folder' : 'file',
                dir: parentPath,
            })
        }
        const newParent = parentPath ? `${parentPath}/${eachChildDoc}` : eachChildDoc;
        if (path[eachChildDoc]) {
            findInFolder(path[eachChildDoc], str, newParent, arr);
        }
    })
}

export const getSearchDoc = (path, str) => {
    const arr = [];
    const parentPath = ""
    findInFolder(path,str,parentPath,arr);
    return arr;
}