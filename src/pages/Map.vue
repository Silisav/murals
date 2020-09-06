<template>
  <Layout>
    <ClientOnly>
      <div style="height: 800px; width: 100%">
        <l-map
          ref="myMap"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="height: 80%"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
        >
          <l-tile-layer :url="url" />
          <l-marker
            v-for="edge in $page.allMural.edges"
            :key="edge.node.id"
            :lat-lng="muralLocation(edge.node.latLong)"
          >
            <l-popup>
              <div>
                <p>{{ edge.node.title }}</p>
                <g-link :to="edge.node.path">
                  <figure>
                    <g-image
                      :src="edge.node.photos[0].thumbnails.large.url"
                      class="map-thumb"
                    />
                  </figure>
                </g-link>
              </div>
            </l-popup>
          </l-marker>
        </l-map>
      </div>
    </ClientOnly>
  </Layout>
</template>	

<script>
let latLng, Icon;
if (process.isClient) {
  Icon = require("leaflet").Icon;
  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
  });
  latLng = require("leaflet").latLng;
}
export default {
  components: {
    LMap: () =>
      import("vue2-leaflet")
        .then(m => m.LMap)
        .catch(),
    LTileLayer: () =>
      import("vue2-leaflet")
        .then(m => m.LTileLayer)
        .catch(),
    LMarker: () =>
      import("vue2-leaflet")
        .then(m => m.LMarker)
        .catch(),
    LPopup: () =>
      import("vue2-leaflet")
        .then(m => m.LPopup)
        .catch()
  },
  metaInfo: {
    titleTemplate: "Street Art Berlin | Map"
  },

  computed: {
    zoom() {
      if (process.isClient) {
        return 12;
      }
    },
    center() {
      if (process.isClient) {
        return latLng(52.521147, 13.404577);
      }
    },
    url() {
      if (process.isClient) {
        return "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
      }
    },
    currentZoom() {
      if (process.isClient) {
        return 11.5;
      }
    },
    currentCenter() {
      if (process.isClient) {
        return latLng(52.521147, 13.404577);
      }
    },
    mapOptions() {
      if (process.isClient) {
        return {
          zoomSnap: 0.5
        };
      }
    }
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    muralLocation(data) {
      if (process.isClient) {
        var latlong = data.split(",");
        var latitude = parseFloat(latlong[0]);
        var longitude = parseFloat(latlong[1]);
        return latLng(latitude, longitude);
      }
    }
  }
};
</script>	

<page-query>	
query Murals {	
  allMural {	
    edges {	
      node{	
        id,	
        title,	
        path,	
        latLong,	
        photos {	
          thumbnails {	
             large{	
              url	
            }	
          }	
        }	
      }	
    }	
  }	
}	
</page-query>	

<style scoped>
.map-thumb {
  width: 90px;
  height: auto;
}
</style>