import React, { useState } from 'react';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/Main/Main';

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Main collapsed={collapsed} />
    </>
  );
};

export default App;
