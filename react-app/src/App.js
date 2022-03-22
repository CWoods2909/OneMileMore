import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/Navbar/navBar'
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Splash from './components/Navbar/SplashPage'
import EventList from './components/Events/events'
import { allEvents } from './store/event';
import Single_Event from './components/Events/SingleEvent'
import Error from './components/Error/Errorpage'

function App() {
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(allEvents())
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {sessionUser && <NavBar user={sessionUser}/>}
      <Switch>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
        <ProtectedRoute path='/events' exact={true} >
          <EventList />
        </ProtectedRoute>
        <ProtectedRoute path='/events/:id' exact={true} >
          <Single_Event />
        </ProtectedRoute>
        <Route>
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
