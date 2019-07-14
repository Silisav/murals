<template>
  <Layout>
    <h1 class="site-heading">Murals @ Berlin</h1>
    <section class="murals">
      <div
        v-masonry
        origin-left="false"
        transition-duration="1s"
        item-selector=".item"
      >
        <MuralPreview
          v-masonry-tile
          v-for="edge in $page.allMural.edges"
          :key="edge.node.id"
          :mural="edge.node"
          class="item mural"
        />
      </div>
    </section>
    <Pager :info="$page.allMural.pageInfo" class="murals-navigation" />
  </Layout>
</template>

<script>
import { Pager } from "gridsome";
import MuralPreview from "../components/MuralPreview";
import Vue from "vue";

export default {
  components: {
    Pager,
    MuralPreview
  },
  metaInfo: {
    titleTemplate: "Street Art Berlin"
  },
  beforeMount() {
    const VueMasonryPlugin = require("vue-masonry").VueMasonryPlugin;
    Vue.use(VueMasonryPlugin);
    if (typeof this.$redrawVueMasonry === "function") {
      this.$redrawVueMasonry();
    }
  }
};
</script>

<page-query>
query Murals($page: Int) {
  allMural (perPage: 11, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node{
        id,
        title,
        path,
        artist,
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

<style>
.site-heading {
  font-size: 45px;
  font-family: "Plume";
  font-weight: normal;
  font-style: normal;
  text-align: center;
}

@media only screen and (min-width: 400px) {
  .site-heading {
    font-size: 50px;
  }
}

@media only screen and (min-width: 768px) {
  .site-heading {
    font-size: 70px;
  }
}

.murals-navigation {
  display: flex;
  justify-content: center;
  flex: 0 1 auto;
}
.murals-navigation a {
  box-sizing: border-box;
  width: 2em;
  background-color: #ccc;
  color: #222;
  font-weight: bold;
  margin: 0.5em;
  text-align: center;
  text-decoration: none;
}
.murals-navigation a.active {
  font-weight: normal;
  background-color: #222;
  color: #fff;
  cursor: default;
}

.murals figure,
.murals img {
  width: 100%;
  margin: 0;
}

.murals .mural {
  display: block;
  width: 48%;
  margin: 1%;
}

@media only screen and (min-width: 400px) {
  .murals .mural {
    width: 23%;
    margin: 1%;
  }
}

@media only screen and (min-width: 768px) {
  .murals .mural {
    width: 18%;
    margin: 1%;
  }
}
</style>
