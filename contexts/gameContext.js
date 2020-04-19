import {
  createContext,
  useContext,
  useReducer,
} from 'react';

import gameReducer from '../reducers/gameReducer';
import { INITIAL_STATE } from '../constants/gameConstants';

const StateContext = createContext();
const DispatchContext = createContext();

const useGameState = () => useContext(StateContext);
const useGameDispatch = () => useContext(DispatchContext);

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
