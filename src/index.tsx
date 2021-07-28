/** @format */

import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Windmill } from "@windmill/react-ui";
import { QueryClient, QueryClientProvider } from "react-query";
import { Auth } from "@supabase/ui";

import { ThemedSuspense } from "./app/components/themedSuspense";
import { Store } from "./app/store";
import "./api/init";
import App from "./App";

import "./app/assets/css/global.css";
import "./app/assets/css/tailwind.output.css";

import { SidebarProvider } from "./app/context";
import { apiClient } from "./api/init";

const queryClient = new QueryClient();

ReactDOM.render(
  <ReduxProvider store={Store}>
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<ThemedSuspense />}>
          <Windmill usePreferences>
            <Auth.UserContextProvider supabaseClient={apiClient}>
              <App />
            </Auth.UserContextProvider>
          </Windmill>
        </Suspense>
      </QueryClientProvider>
    </SidebarProvider>
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
