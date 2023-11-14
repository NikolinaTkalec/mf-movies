<template>
  <Suspense>
    <div class="list-container">
      <template v-for="item in list" v-bind:key="item?.video?.title">
        <Parcel
          :config="parcelConfig"
          :mountParcel="mountParcel"
          :parcelProps="
            getParcelProps(item?.video?.title, item?.video?.thumbnails[0].url)
          "
        />
      </template>
    </div>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script>
import Parcel from "single-spa-vue/parcel";
import { mountRootParcel } from "single-spa";
import { getAllMovies } from "@serengeti/api";
import { ThumbnailParcelConfig } from "@serengeti/styleguide";
import { ref } from "vue";

export default {
  name: "MoviesList",
  components: {
    Parcel,
  },
  data() {
    return {
      mountParcel: mountRootParcel,
      parcelConfig: ThumbnailParcelConfig,
    };
  },
  methods: {
    // These are the props passed into the parcel
    getParcelProps(title, src) {
      return {
        title: title,
        thumbnailSrc: src,
      };
    },
    async getData() {
      try {
        let result = await getAllMovies();
        this.list = result.contents;
      } catch (error) {
        //TODO implement error handler
        console.error(error);
      }
    },
  },

  setup() {
    const list = ref({});

    // expose to template and other options API hooks
    return {
      list,
    };
  },
  mounted() {
    this.getData();
  },
};
</script>
