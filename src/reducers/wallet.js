// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET, EXPENSES, CONVERSAO, DELETE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  conversao: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      currencies: action.data,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.data],
    };
  case CONVERSAO:
    return {
      ...state,
      conversao: [...state.conversao, action.state],
    };
  case DELETE:
    return {
      ...state,
      expenses: action.state,
    };
  default:
    return state;
  }
}

export default wallet;
