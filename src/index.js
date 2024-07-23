import React from "react";
import { createRoot } from "react-dom/client";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { createHashRouter, RouterProvider } from '@vkontakte/vk-mini-apps-router';
import { AdaptivityProvider, useAppearance, AppRoot, ConfigProvider } from '@vkontakte/vkui';


//TODO custom styles
import '@vkontakte/vkui/dist/vkui.css'

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
  }
]);

const container = document.getElementById('root');
const root = createRoot(container);
const theme = ()=>useAppearance();
console.log(theme === 'light' ? 'light' : 'dark');
root.render(
  <ConfigProvider appearance={theme === 'light' ? 'light' : 'dark'}>
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
