import { React, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { createHashRouter, RouterProvider } from '@vkontakte/vk-mini-apps-router';
import { AdaptivityProvider, useColorScheme, AppRoot, ConfigProvider, Div, ColorScheme } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/components.css';
import './index.css';
import './themes/geekmo-theme.css';
import './themes/geekmo-theme-dark.css';

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
  },
  {
    path: '/campaign/rogues_gallery',
    panel: 'campaign',
    view: 'rogues_gallery',
  },
  {
    path: '/char/rogues_gallery',
    panel: 'char',
    view: 'rogues_gallery',
  },
  {
    path: '/requests/rogues_gallery',
    panel: 'requests',
    view: 'rogues_gallery',
  },
  {
    path: '/enter',
    panel: 'enter',
    view: 'default',
  }
]);

function ThemedApp() {

  // const colorScheme = useColorScheme();
  const colorScheme = ColorScheme.DARK; // force dark mode

  return (
      <ConfigProvider colorScheme={colorScheme} tokensClassNames={{
        light: 'geekmoTheme--light',
        dark: 'geekmoTheme--dark'
      }}>
        <AdaptivityProvider>
          <AppRoot>
            <RouterProvider router={router} notFound={<p>Ничегошеньки!</p>}>
              <App className="gradient-app"/>
            </RouterProvider>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
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
