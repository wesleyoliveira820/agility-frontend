import { Helmet } from 'react-helmet-async';

import Header from './Header';
import Hero from './Hero';

function Home() {
  return (
    <div>
      <Helmet>
        <title>Bem-vindo(a) ao Agility</title>
      </Helmet>
      <Header />
      <Hero />
    </div>
  );
}

export default Home;
