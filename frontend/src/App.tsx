import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CountryDetail from "./components/CountryDetail";
import CountryForm from "./components/CountryForm";
import { PageLayout } from "./components/Layout";
import { HomePage } from "./pages/Home";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route Component={PageLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="*" Component={() => <Navigate to="/" />} />
            <Route path="/country/:code" Component={CountryDetail} />
            <Route path="/add" Component={CountryForm} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
