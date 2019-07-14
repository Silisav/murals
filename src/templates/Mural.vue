<template>
  <transition name="fade" appear>
    <Layout>
      <section class="main">
        <h1>{{ $page.mural.title }}</h1>

        <p>{{ $page.mural.artist }}</p>
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
</style>



<script>
export default {
  metaInfo() {
    return {
      title: this.$page.mural.title
    };
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