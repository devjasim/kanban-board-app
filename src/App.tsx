import React from 'react';
import './assets/scss/main.scss';

const Header = React.lazy(() => import('./components/header'));
const Footer = React.lazy(() => import('./components/footer'));
const Content = React.lazy(() => import('./components/content'));

function App() {
  return (
    <div className="app__wrapper">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
