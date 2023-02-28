import produce from "immer";
import { getCurrentFolder } from "../util/folderUtil";


export function pathReducer(state, action) {
    switch (action.type) {
        case 'add': {
            return produce(state, draftState => {
                const currentDir = getCurrentFolder(draftState.path, action.currentPath);
                currentDir[action.name] = action.fileType === 'file' ? false : {};
            })
        }
        case 'update': {
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
        case 'updateSearch': {
            return produce(state, draftState => {
                draftState.search = action.value;
            })
        }
        default: throw Error('Unknown action: ' + action.type);
    }
}