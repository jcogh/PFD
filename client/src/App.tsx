import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Add more routes here */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
