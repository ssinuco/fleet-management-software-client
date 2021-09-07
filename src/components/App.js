import { Fragment } from "react";
import AppContext from "../context/AppContext";
import Search from "./Search";
import Map from "./Map";
import useInitialState from "../hooks/useInitialState";

const App = () => {
  const initialState = useInitialState();

  return (
      <Fragment>
        <AppContext.Provider value={initialState}>
          <Search />
          <Map />
        </AppContext.Provider>
      </Fragment>
  );
}

export default App;
