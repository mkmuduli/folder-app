import produce from "immer";

export const getCurrentFolder = (path, currentPath) => {
    if(!currentPath) return path;
    const dir = currentPath.split("/");
    let currentDir = path;
    dir.forEach((eachDir) => {
        currentDir = currentDir[eachDir];
    })
    return currentDir;
}


export function pathReducer(path, action) {
    switch (action.type) {
        case 'add': {
            return produce(path, draftState => {
                const currentDir = getCurrentFolder(draftState.path, action.currentPath);
                currentDir[action.name] = action.type === 'file' ? false : {};
            })
        }
        case 'update': {
            return produce(path, draftState => {
                const currentDir = getCurrentFolder(draftState.path, action.currentPath);
                currentDir[action.oldName] = action.name;
            })
        }
        case 'delete': {
            return produce(path, draftState => {
                const currentDir = getCurrentFolder(draftState.path, action.currentPath);
                delete currentDir[action.oldName];
            })
        }
        case 'updateCurrentPath': {
            return produce(path, draftState => {
                draftState.currentPath = action.value;
            })
        }
    }
    throw Error('Unknown action: ' + action.type);
}