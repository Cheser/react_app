const ADD_CASE = 'ADD_CASE';
const ADD_PIZA = 'ADD_PIZA';
const EDIT_PIZA_NAME = 'EDIT_PIZA_NAME';
const EDIT_PIZA_AUTHOR = 'EDIT_PIZA_AUTHOR';
const REMOVE_PIZA = 'REMOVE_PIZA';
const DOWNLOAD_PIZAS_DATA = 'DOWNLOAD_PIZAS_DATA';
const MOVE_PIZA_LEFT = 'MOVE_PIZA_LEFT';
const MOVE_PIZA_RIGHT = 'MOVE_PIZA_RIGHT';


const addCaseAction = (pizaArr) => ({
    type: ADD_CASE,
    payload: pizaArr
});

const addPizaAction = ({ piza, pizaArrId }) => ({
    type: ADD_PIZA,
    payload: { piza, pizaArrId }
});

const editPizaNameAction = ({ pizaId, pizaArrId, newName }) => ({
    type: EDIT_PIZA_NAME,
    payload: { pizaId, pizaArrId, newName }
});



const removePizaAction = ({ pizaId, pizaArrId }) => ({
    type: REMOVE_PIZA,
    payload: { pizaId, pizaArrId }
});

const downloadPizasDataAction = (pizacase) => ({
    type: DOWNLOAD_PIZAS_DATA,
    payload: pizacase
});

const movePizaLeftAction = ({ pizaId, pizaArrId }) => ({
    type: MOVE_PIZA_LEFT,
    payload: { pizaId, pizaArrId }
});

const movePizaRightAction = ({ pizaId, pizaArrId  }) => ({
    type: MOVE_PIZA_RIGHT,
    payload: { pizaId, pizaArrId }
});

export {
    ADD_CASE,
    ADD_PIZA,
    EDIT_PIZA_NAME,
    REMOVE_PIZA,
    DOWNLOAD_PIZAS_DATA,
    MOVE_PIZA_LEFT,
    MOVE_PIZA_RIGHT,
    addCaseAction,
    addPizaAction,
    editPizaNameAction,
    removePizaAction,
    downloadPizasDataAction,
    movePizaLeftAction,
    movePizaRightAction
};
