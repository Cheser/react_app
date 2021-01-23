const hostname = 'http://localhost:9999';

const getCases = async () => {
    const response = await fetch(hostname + '/pizaarr', {method: 'GET'});
    if (response.status !== 200) {
        throw new Error(`getCases returned ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
};

const addCase = async (pizaArr) => {
    const response = await fetch(hostname + '/pizaarr', {
        method: 'POST', 
        body: JSON.stringify(pizaArr),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`addCase returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const addPiza = async ({ piza, pizaArrId }) => {
    const response = await fetch(hostname + `/pizaarr/${pizaArrId}/piza`, {
        method: 'POST', 
        body: JSON.stringify(piza),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);

    if (response.status !== 200) {
        throw new Error(`addPiza returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const editPiza = async ({ pizaId, pizaArrId, newName}) => {
    const response = await fetch(hostname + `/pizaarr/${pizaArrId}/piza/${pizaId}`, {
        method: 'PATCH', 
        body: JSON.stringify({ newName: newName,}), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`editPizaName returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const removePiza = async ({ pizaId, pizaArrId }) => {
    const response = await fetch(hostname + `/pizaarr/${pizaArrId}/piza/${pizaId}`, {
        method: 'DELETE'
    });

    if (response.status !== 200) {
        throw new Error(`removePiza returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const movePiza = async ({ pizaId, pizaArrId, destShelfId }) => {
    const response = await fetch(hostname + `/pizaarr/${pizaArrId}`, {
        method: 'PATCH',
        body: JSON.stringify({ pizaId: pizaId, destShelfId: destShelfId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`removePiza returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

export {
    getCases,
    addCase,
    addPiza,
    editPiza,
    removePiza,
    movePiza,
};
