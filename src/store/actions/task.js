export const create =(props)=>({
    type:'CREATE_TASK',
    payload: props,
});

export const update =(id, props)=>({
    type:'UPDATE_TASK',
    payload: {id, props},
});

export const moveTask =(props)=>({
    type:'MOVE_TASK',
    payload: props,
});

export const editableTask =(props)=>({
    type:'EDITABLE_TASK',
    payload: props,
});