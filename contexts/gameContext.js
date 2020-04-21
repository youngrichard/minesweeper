import {
  createContext,
  useContext,
  useReducer,
} from 'react';

import gameReducer from '../reducers/gameReducer';
import { INITIAL_STATE } from '../constants/gameConstants';

// Create state and dispatch contexts
const StateContext = createContext();
const DispatchContext = createContext();

// Create hooks for consuming contexts
const useGameState = () => useContext(StateContext);
const useGameDispatch = () => useContext(DispatchContext);

// Provides contexts children
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

export {
  GameProvider,
  useGameState,
  useGameDispatch,
};
