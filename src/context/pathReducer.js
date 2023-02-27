import produce from "immer";

export const getCurrentFolder = (path, currentPath) => {
    if (!currentPath) return path;
    const dir = currentPath.split("/");
    let currentDir = path;
    dir.forEach((eachDir) => {
        currentDir = currentDir[eachDir];
    })
    return currentDir;
}

export function pathReducer(state, action) {
    switch (action.type) {
        case 'add': {
            return produce(state, draftState => {
                const currentDir = getCurrentFolder(draftState.path, action.currentPath);
                currentDir[action.name] = action.fileType === 'file' ? false : {};
            })
        }
        case 'update': {
            console.log(action)
            return produce(state, draftState => {
                const currentDir = getCurrentFolder(draftState.path, action.currentPath);
                currentDir[action.name] = currentDir[action.oldName];
                delete currentDir[action.oldName];
            })
        }
        case 'delete': {
            return produce(state, draftState => {
                const currentDir = getCurrentFolder(draftState.path, action.currentPath);
                delete currentDir[action.name];
            })
        }
        case 'updateCurrentPath': {
            return produce(state, draftState => {
                draftState.currentPath = action.value;
            })
        }
        default: throw Error('Unknown action: ' + action.type);
    }
}