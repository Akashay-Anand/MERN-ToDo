import { LightTheme, BaseProvider } from 'baseui'; // #bw
import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic'; // #bw
import { Provider as StyletronProvider } from 'styletron-react'; // #bw

import { Header, Footer } from './components';
import { DepsProvider } from './contexts';
import { Config } from './helpers';
import { About, Login, NotFound } from './pages';
import { AccessService } from './services';
import InspectLet from './vendor/inspectlet';

import './app.global.scss';

const engine = new Styletron(); // #bw

export default function App(): React.ReactElement {
  useEffect(() => {
    const inspectletKey = Config.getConfigValue('inspectletKey');

    if (inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
    <DepsProvider deps={{
      accessService: new AccessService(),
    }}>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </DepsProvider>
      </BaseProvider>
    </StyletronProvider>
  );
}
