import React from 'react';
import { TypeConfig } from './types';
import useLang from "./hooks/useLang";
import gemSvg from "./assets/svg/gem.svg";

interface AppProps {
  config: TypeConfig;
}

function App({ config }: AppProps) {
  const lang  = useLang(config.usLanguage.usDefault)
  return (
    <div className="usWelcome">
      <img width={280} src={gemSvg} alt={lang['app.logo']}/>
      <h1>{lang['app.logo']}</h1>
      <h2>{lang['app.welcome']}</h2>
      <div className="usCopyright">
        <p><a target="_blank" href="https://github.com/gliesereumlab">{config.usCopyright} GitHub</a></p>
      </div>
    </div>
  );
}

export default App;
