import React from "react";
import { createRoot } from "react-dom/client";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { createHashRouter, RouterProvider } from '@vkontakte/vk-mini-apps-router';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';


//TODO custom styles
import '@vkontakte/vkui/dist/components.css';
import '@vkontakte/vkui-tokens/themes/vkCom/cssVars/declarations/onlyVariables.css';
import '@vkontakte/vkui-tokens/themes/vkComDark/cssVars/declarations/onlyVariablesLocal.css';

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
    path: '/campaign/starfinder',
    panel: 'campaign',
    view: 'starfinder',
  },
  {
    path: '/char/starfinder',
    panel: 'char',
    view: 'starfinder',
  }
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <RouterProvider router={router} notFound={<p>Ничегошеньки!</p>}>
          <App />
        </RouterProvider>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => { }); //runtime download
}
