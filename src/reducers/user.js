// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER:
    return {
      ...state,
      email: action.state,
    };
  default:
    return state;
  }
}

export default user;
