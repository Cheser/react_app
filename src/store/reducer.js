import {
    ADD_CASE,
    ADD_PIZA,
    EDIT_PIZA_NAME,

    REMOVE_PIZA,
    DOWNLOAD_PIZAS_DATA,
    MOVE_PIZA_LEFT,
    MOVE_PIZA_RIGHT
} from './actions';

const initialState = {
    pizacase: []
};

export default function reducer(state=initialState, {type, payload}) {
    let pizaToMove = null;

    switch(type) {
    case ADD_CASE:
        return {
            ...state,
            pizacase: [
                ...state.pizacase, payload
            ]
        };
    case ADD_PIZA:
        return {
            ...state,
            pizacase: state.pizacase.map((pizaArr, index) => (
                index === payload.pizaArrId ? {
                    ...pizaArr,
                    pizas: [...pizaArr.pizas, payload.piza]
                }
                : pizaArr
            ))
        };
    case EDIT_PIZA_NAME:
        return {
            ...state,
            pizacase: state.pizacase.map((pizaArr, index) => (
                index === payload.pizaArrId ? {
                    ...pizaArr,
                    pizas: pizaArr.pizas.map((piza, indexPiza) => (
                        indexPiza === payload.pizaId ? {
                            ...piza,
                            name: payload.newName
                        }
                        : piza
                    ))
                }
                : pizaArr
            ))
        };

    case REMOVE_PIZA:
        return {
            ...state,
            pizacase: state.pizacase.map((pizaArr, index) => (
                index === payload.pizaArrId ? {
                    ...pizaArr,
                    pizas: pizaArr.pizas.filter((piza, pizaIndex) => (pizaIndex !== payload.pizaId))
                }
                : pizaArr
            ))
        };
    case DOWNLOAD_PIZAS_DATA:
        return {
            ...state,
            pizacase: payload
        }
    case MOVE_PIZA_LEFT:
        pizaToMove = state.pizacase[payload.pizaArrId].pizas[payload.pizaId];

        return {
            ...state,
            pizacase: state.pizacase.map((pizaArr, index) => {
                if (index === payload.pizaArrId) {
                    return {
                        ...pizaArr,
                        pizas: pizaArr.pizas.filter((piza, pizaIndex) => (pizaIndex !== payload.pizaId))
                    };
                }
                if (index === payload.pizaArrId - 1) {
                    return {
                        ...pizaArr,
                        pizas: [...pizaArr.pizas, pizaToMove]
                    };
                }
                return pizaArr;
            })
        };
    case MOVE_PIZA_RIGHT:
        pizaToMove = state.pizacase[payload.pizaArrId].pizas[payload.pizaId];

        return {
            ...state,
            pizacase: state.pizacase.map((pizaArr, index) => {
                if (index === payload.pizaArrId) {
                    return {
                        ...pizaArr,
                        pizas: pizaArr.pizas.filter((piza, pizaIndex) => (pizaIndex !== payload.pizaId))
                    };
                }
                if (index === payload.pizaArrId + 1) {
                    return {
                        ...pizaArr,
                        pizas: [...pizaArr.pizas, pizaToMove]
                    };
                }
                return pizaArr;
            })
        };
    default:
        return state;
    }
};
