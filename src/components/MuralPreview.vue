<template>
  <article>
    <g-link :to="mural.path">
      <figure v-if="image">
        <g-image :src="image.url" :alt="image.name" />
      </figure>
    </g-link>
  </article>
</template>

<script>
export default {
  name: "MuralPreview",
  props: ["mural"],

  data() {
    return {
      image: this.mural.photos.length
        ? {
            name: this.mural.photos[0].filename,
            url: this.mural.photos[0].thumbnails.large.url
          }
        : null
    };
  }
};
</script>

<style scoped>
</style>