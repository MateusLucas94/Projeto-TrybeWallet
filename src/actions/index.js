// Coloque aqui suas actions
export const USER = 'USER';
export const WALLET = 'WALLET';
export const EXPENSES = 'EXPENSES';
export const CONVERSAO = 'CONVERSAO';
export const DELETE = 'DELETE';

export const conversaoDeMoeda = (state) => ({
  type: CONVERSAO,
  state,
});

export const deletarDespesas = (state) => ({
  type: DELETE,
  state,
});

export const getUserInfo = (state) => ({
  type: USER,
  state,
});

export const getWalletInfo = (state) => ({
  type: WALLET,
  data: state,
});

export const sendWalletInfo = (state) => ({
  type: EXPENSES,
  data: state,
});

export function dispatchWalletInfo(state) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      state.exchangeRates = data;
      dispatch(sendWalletInfo(state));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchApi() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const filtarData = Object.keys(data).filter((moeda) => moeda !== 'USDT');
      dispatch(getWalletInfo(filtarData));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteExpense(id, expenses) {
  return async (dispatch) => {
    const filtrarExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(deletarDespesas(filtrarExpenses));
  };
}
