import {
  createContext,
  useContext,
  useReducer,
} from 'react';

import gameReducer from '../reducers/gameReducer';
import INITIAL_STATE from '../constants/gameConstants';

const StateContext = createContext();
const DispatchContext = createContext();

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useGameState = () => {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useGameState must be used within GameProvider');
  }

  return context;
}

const useGameDispatch = () => {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useGameDispatch must be used within GameProvider');
  }

  return context;
}

export {
  GameProvider,
  useGameState,
  useGameDispatch,
};
