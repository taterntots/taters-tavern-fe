import React, { useState, useEffect } from 'react';

// ROUTING
import { Route, Switch } from 'react-router-dom';

// COMPONENTS
import { User } from '../features/user/User';
import NavBar from './NavBar';
import Footer from './Footer';
import ResetPassword from './Auth/ResetPassword';
import HomePage from '../components/HomePage';
import UserPage from '../components/UserPage';
import GameList from '../features/game/GameList';
import GamePage from '../components/GamePage';

// ----------------------------------------------------------------------------------
// ---------------------------------- DASHBOARD -------------------------------------
// ----------------------------------------------------------------------------------

const Dashboard = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('');

  // Function for handling search input
  const handleInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  // Function for clearing search bar terms when clicking elsewhere
  const handleClearSearchBar = () => {
    setSearchTerm('');
    document.getElementById('searchBar').value = ''
  };

  return (
    <>
      {/* NAVBAR */}
      <NavBar handleClearSearchBar={handleClearSearchBar} handleInputChange={handleInputChange} />

      {/* BODY */}
      <div className='mx-10 my-3'>
        <Switch>
          <Route
            exact
            path={`/`}
            render={(props) => (
              <HomePage
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                {...props}
              />
            )}
          />
          <Route path={'/reset-password'} handleClearSearchBar={handleClearSearchBar} component={ResetPassword} />
          <Route
            exact
            path={`/games`}
            render={(props) => (
              <GameList
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/games/:gameId/challenges`}
            render={(props) => (
              <GamePage
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/support`}
            render={(props) => (
              <User
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/about`}
            render={(props) => (
              <User
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/faq`}
            render={(props) => (
              <User
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/terms`}
            render={(props) => (
              <User
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/contact`}
            render={(props) => (
              <User
                {...props}
              />
            )}
          />
          <Route
            path={`/:username`}
            render={(props) => (
              <UserPage
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                {...props}
              />
            )}
          />
        </Switch>
      </div>

      {/* FOOTER */}
      <Footer handleClearSearchBar={handleClearSearchBar} />
    </>
  );
}

export default Dashboard;