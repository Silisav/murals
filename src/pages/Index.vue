<template>
  <Layout>
    <h1 class="site-heading">Murals @ Berlin</h1>
    <section class="murals">
      <MuralPreview
        v-for="edge in $page.allMural.edges"
        :key="edge.node.id"
        :mural="edge.node"
        class="item mural"
      />
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

.murals {
  column-count: 2;
  column-gap: 5px;
}

.murals .mural {
  display: inline-block;
  margin-bottom: 3px;
}

@media only screen and (min-width: 400px) {
  .murals {
    column-count: 3;
    column-gap: 8px;
  }

  .murals .mural {
    margin-bottom: 6px;
  }
}

@media only screen and (min-width: 768px) {
  .murals {
    column-count: 4;
    column-gap: 10px;
  }

  .murals .mural {
    margin-bottom: 8px;
  }
}
</style>
