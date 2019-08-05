<template>
  <transition name="fade" appear>
    <Layout>
      <section class="main">
        <span>TITLE</span>
        <h1>{{ $page.mural.title }}</h1>

        <span>ARTIST</span>
        <h2><span v-html="artist"></span></h2>

        <p>{{ $page.mural.address }} <span v-html="gmapsLink"></span></p>
        <aside>
          <figure>
            <g-image
              :src="$page.mural.photos[0].thumbnails.full.url"
              alt="mural Image"
              class="img-main"
            />
          </figure>
        </aside>
      </section>
    </Layout>
  </transition>
</template>

<style scoped>
figure,
.img-main {
  display: block;
  width: 100%;
  max-width: 600px;
  height: auto;
  margin: 0;
}

.fade-enter {
  opacity: 0;
}

h1,
h2 {
  margin-top: 5px;
}
</style>



<script>
export default {
  name: "Mural",

  metaInfo() {
    return {
      title: this.$page.mural.title
    };
  },

  computed: {
    artist() {
      return this.$page.mural.website
        ? `<a href="${this.$page.mural.website}" target="_blank">${this.$page.mural.artist}</a>`
        : this.$page.mural.artist;
    },

    gmapsLink() {
      return this.$page.mural.latLong
        ? `<a href="https://www.google.com/maps/search/?api=1&query=${
            this.getCoordinates(this.$page.mural.latLong).latitude
          },${
            this.getCoordinates(this.$page.mural.latLong).longitude
          }" target="_blank"><br/>(View on Google maps)</a>`
        : "";
    }
  },

  methods: {
    getCoordinates(coordinates) {
      const [latitude, longitude] = coordinates.split(",");
      return { latitude, longitude };
    }
  }
};
</script>

<page-query>
query Mural ($path: String!) {
  mural(path: $path) {
    id,
    title,
    path,
    artist,
    website,
    address,
    latLong,
    photos {
      thumbnails {
         full{
          url 
        }
      }
    }
  }
}
</page-query>