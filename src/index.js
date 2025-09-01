import { React, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { createHashRouter, RouterProvider } from '@vkontakte/vk-mini-apps-router';
import { AdaptivityProvider, useAppearance, AppRoot, ConfigProvider, Div } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css'
import './vkui-overrides.css';

// Init VK Mini App
bridge.send("VKWebAppInit");

const router = createHashRouter([
  {
    path: '/',
    panel: 'intro',
    view: 'default',
  },
  {
    path: '/campaign/lost_omens',
    panel: 'campaign',
    view: 'lost_omens',
  },
  {
    path: '/char/lost_omens',
    panel: 'char',
    view: 'lost_omens',
  },
  {
    path: '/campaign/golarion_heroes',
    panel: 'campaign',
    view: 'golarion_heroes',
  },
  {
    path: '/char/golarion_heroes',
    panel: 'char',
    view: 'golarion_heroes',
  },
  {
    path: '/campaign/ouroboros',
    panel: 'campaign',
    view: 'ouroboros',
  },
  {
    path: '/char/ouroboros',
    panel: 'char',
    view: 'ouroboros',
  },
  {
    path: '/campaign/silver_marshes',
    panel: 'campaign',
    view: 'silver_marshes',
  },
  {
    path: '/char/silver_marshes',
    panel: 'char',
    view: 'silver_marshes',
  },
  {
    path: '/campaign/blue_waters',
    panel: 'campaign',
    view: 'blue_waters',
  },
  {
    path: '/campaign/voux_umbra',
    panel: 'campaign',
    view: 'voux_umbra',
  }
  ,
  {
    path: '/campaign/rogues_gallery',
    panel: 'campaign',
    view: 'rogues_gallery',
  }
]);

function ThemedApp() {

  const [appearance, setAppearance] = useState('light'); // default fallback

  useEffect(() => {
    // Listen for VKWebAppUpdateConfig
    bridge.subscribe((e) => {
      if (
        e.detail.type === 'VKWebAppUpdateConfig' &&
        e.detail.data?.appearance
      ) {
        setAppearance(e.detail.data.appearance); // 'light' or 'dark'
      }
    });

    // Request config explicitly in case it’s not pushed immediately
    bridge
      .send('VKWebAppGetConfig')
      .then((data) => {
        if (data.appearance) {
          setAppearance('dark'); //TODO - remove dark theme enforcing
        }
      })
      .catch(console.error);
  }, []);

  const panelBgColor =
    appearance === 'dark'
      ? 'rgba(18, 18, 18, 0.45)'    // dark semi-transparent
      : 'rgba(255, 255, 255, 0.05)'; // light semi-transparent

  const panelHeaderBgColor =
    appearance === 'dark'
      ? 'rgba(34, 34, 34, 1)'    // dark 
      : 'rgba(255, 255, 255, 1)'; // light 

  return (
    <div className="gradient-app"
      style={{ '--panel-bg-color': panelBgColor,  '--panel-header-bg-color': panelHeaderBgColor,}}
    >
      <Div className="geekmoGradient" />
      <ConfigProvider appearance={appearance}>
        <AdaptivityProvider>
          <AppRoot>
            <RouterProvider router={router} notFound={<p>Ничегошеньки!</p>}>
              <App/>
            </RouterProvider>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </div>
  );
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemedApp />
);
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => { }); //runtime download
}
