<template>
  <Layout>
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
  </Layout>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  metaInfo: {
    titleTemplate: "Street Art Berlin | Map"
  },
  data() {
    return {
      zoom: 15,
      center: latLng(52.547715, 13.413936),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      currentZoom: 11.5,
      currentCenter: latLng(52.547715, 13.413936),
      mapOptions: {
        zoomSnap: 0.5
      }
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    muralLocation(data) {
      var latlong = data.split(",");
      var latitude = parseFloat(latlong[0]);
      var longitude = parseFloat(latlong[1]);
      return latLng(latitude, longitude);
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