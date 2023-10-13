import React from 'react';
import { TypeConfig } from './types';
import useLang from "./hooks/useLang";
import gemSvg from "./assets/svg/gem.svg";
import useAppStore from './hooks/useAppStore';
import Gliesereum from './wallet';


function App() {
  const root = useAppStore("root") as TypeConfig;
  const lang  = useLang(root.usLanguage.usDefault)

  return (
    <div className="usWelcome">

      <img width={280} src={gemSvg} alt={lang['app.logo']}/>
      <h1>{lang['app.logo']}</h1>
      <h2>{lang['app.welcome']}</h2>

      <div className="usCopyright">
        <p><a target="_blank" rel="noopener noreferrer" href="https://github.com/gliesereumlab">{root.usCopyright} GitHub</a></p>
      </div>
    </div>
  );
}

export default App;
