import React, { Suspense, lazy } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import '@fontsource/ubuntu/300.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import Spinner from './components/Spinner';

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#dcdcdc',
      main: '#fff',
      light: '#fff',
    },
    secondary: {
      dark: '#00573F', // Jets Gotham green
      main: '#006241', // Starbucks green
      light: '#009150', // Spanish green
    },
    red: '#e62020',
  },
  typography: {
    fontFamily: 'ubuntu',
    body2: {
      fontSize: '0.9rem',
    },
    button: {
      textTransform: 'none',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

// code splitting prevents initial load time from being too long
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Board = lazy(() => import('./pages/Board'));
const Settings = lazy(() => import('./pages/Settings'));

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/b/:id/s" component={Settings} />
          <Route path="/b/:id" component={Board} />
        </Switch>
      </Suspense>
    </Router>
  </MuiThemeProvider>
);

export default App;
