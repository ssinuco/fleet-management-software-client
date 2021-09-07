import { useState } from 'react';

const useInitialState = () => {
    const [state, setState] = useState({positions: []});

    const setPositions = (positions) => {
        setState({...state, positions});
    };

    return {
        state,
        setPositions
    }
}

export default useInitialState;
