/** @format */

import React from "react";
import { Auth as SupabaseAuth } from "@supabase/ui";
import { apiClient } from "../../../api/init";

function Auth() {
  return (
    <div className="h-screen container grid content-center justify-center px-6 mx-auto ">
      <div className="flex flex-col justify-center content-center md:w-96 sm:w-screen sm:px-8">
        <div className="flex flex-col text-black font-bold text-xl justify-center items-center mb-8">
          <svg
            className="mb-2"
            height="64"
            viewBox="0 0 512 512"
            width="64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m118.8 450.37-44.8-373.37h-31l44.8 373.37a43.987 43.987 0 0 0 43.52 38.63h31a43.987 43.987 0 0 1 -43.52-38.63z"
              fill="#d4e1f4"
            />
            <path
              d="m95.89 23h-31a53.97 53.97 0 0 0 -53.89 54h31a53.97 53.97 0 0 1 53.89-54z"
              fill="#d4e1f4"
            />
            <g fill="#0635c9">
              <path d="m447.111 17h-382.222a60.054 60.054 0 0 0 -59.889 60 6 6 0 0 0 6 6h26.289l17.55 156.153 26.833 211.952a50.261 50.261 0 0 0 49.644 43.895h249.368a50.235 50.235 0 0 0 49.644-43.865l26.842-212.008 17.541-156.127h26.289a6.048 6.048 0 0 0 6-6.056 60 60 0 0 0 -59.889-59.944zm-1.856 220.646-26.832 211.954a38.238 38.238 0 0 1 -37.739 33.4h-249.368a38.213 38.213 0 0 1 -37.739-33.373l-26.823-211.841-17.39-154.786h413.272zm-427.881-166.646c2.962-23 23.141-42 47.515-42h382.222c24.375 0 44.556 19 47.515 42z" />
              <path d="m77.924 117.468a6 6 0 0 0 5.972 5.495c.169 0 .34-.007.512-.022a6 6 0 0 0 5.473-6.484l-.227-2.687a6 6 0 0 0 -11.954 1.011z" />
              <path d="m85.028 130.277a6 6 0 0 0 -5.473 6.484l5.62 66.474a6 6 0 0 0 5.971 5.495c.17 0 .341-.007.513-.022a6 6 0 0 0 5.473-6.483l-5.62-66.475a5.993 5.993 0 0 0 -6.484-5.473z" />
            </g>
            <path
              d="m479 113.059c0 88.982-71.128 161.5-159.427 164.368a25.768 25.768 0 0 0 -25.21-21.427h-76.726a25.768 25.768 0 0 0 -25.21 21.427c-88.299-2.865-159.427-75.386-159.427-164.368v-30.059h-12v30.059c0 95.588 76.491 173.653 171.392 176.541a25.579 25.579 0 0 0 25.245 21.4h76.726a25.579 25.579 0 0 0 25.245-21.4c94.901-2.888 171.392-80.953 171.392-176.541v-30.059h-12zm-172 172.564a13.377 13.377 0 0 1 -13.377 13.377h-76.246a13.377 13.377 0 0 1 -13.377-13.377v-4.246a13.377 13.377 0 0 1 13.377-13.377h76.246a13.377 13.377 0 0 1 13.377 13.377z"
              fill="#1ae5be"
            />
          </svg>
          <p style={{ color: "rgb(8, 168, 138)" }}>Budget Bucket</p>
        </div>

        <SupabaseAuth
          supabaseClient={apiClient}
          providers={["google", "facebook"]}
          // onlyThirdPartyProviders
          // socialColors
        />
      </div>
    </div>
  );
}
export default Auth;
