const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;


// Initial state
const initialState = {
  loading: false,
  data: [],
  error: "",
};

const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";

// Actions
const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};


// Reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
  }
};
export  const fetchData = () => {
  return (dispatch) => {
    console.log("inside actions")
    dispatch(fetchDataRequest());
    fetch(
      "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2021-08-06T08%3A55%3A00%2B00%3A00&limit=1000&page=1&offset=0&sort=desc&parameter=o3&radius=1000&country_id=IN&city=Delhi&location_id=10487&order_by=datetime"
    )
      .then((response) => response.json())
      .then((data) => {
        const dateValues = data.results.map((obj) => {
          return {
            date: obj.date.utc,
            pollutant_value: obj.value,
          };
        });
        dispatch(fetchDataSuccess(dateValues));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
// store.subscribe(() => {
//   console.log("store----->",store.getState());
// });
// store.dispatch(fetchData());

 export default store;

