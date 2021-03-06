// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";

import "leaflet/dist/leaflet.css";
import "~/assets/styles.css";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  if (isClient) {
    Vue.component("l-map", () => import("vue2-leaflet").then((m) => m.LMap));
    Vue.component("l-tile-layer", () =>
      import("vue2-leaflet").then((m) => m.LTileLayer)
    );
    Vue.component("l-marker", () =>
      import("vue2-leaflet").then((m) => m.LMarker)
    );
  }
}
