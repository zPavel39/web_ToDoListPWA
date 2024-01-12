import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    // Ваш код для вывода уведомления о наличии обновлений
    const result = window.confirm("Доступна новая версия приложения. Обновить?");
    if (result) {
      // Отправка сообщения Service Worker о пропуске ожидания
      updateSW.unregister();
      updateSW.register();
    }
  },
  onOfflineReady() {
    // Ваш код для обработки события оффлайн-режима, если необходимо
  },
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

);