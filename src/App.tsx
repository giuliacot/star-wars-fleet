import style from './App.module.css';
import { Details } from './Steps/Details/Details';
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import React from 'react';
import { FleetData } from './Steps/fleetContext';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Stepper } from './components/Stepper/Stepper';

function App() {
  const queryClient = new QueryClient();

  return (
    <FleetData>
      <div className={style.app}>
        <Helmet>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          />
        </Helmet>

        <h1>Star Wars Fleet</h1>
        <h2 className={style.title}>It's time to setup you fleet 💫</h2>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Stepper />
            <Switch>
              <Route path="/details" component={() => <Details />} />
              <Route path="/starships" component={() => <div>Starships</div>} />
              <Route path="/generals" component={() => <div>Generals</div>} />
            </Switch>
          </Router>
        </QueryClientProvider>
      </div>
    </FleetData>
  );
}

export default App;
