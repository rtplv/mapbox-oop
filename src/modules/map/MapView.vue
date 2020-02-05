<template>
  <section class="map-page">
    <section
      class="left-block"
      :class="{'invisible': isLoading}"
    >
      <slot name="left-block" />
    </section>

    <div
      class="right-block"
      :class="{'invisible': isLoading}"
    >
      <slot name="right-block" />
    </div>

    <app-spinner
      v-show="isLoading"
      class="loader"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import AppSpinner from '~ui/Spinner.vue';

@Component({
  components: { AppSpinner },
})
export default class MapView extends Vue {
  @Prop({ default: false }) readonly isLoading?: boolean;
}
</script>

<style lang="scss">
  @import '~mapbox-gl/dist/mapbox-gl.css';

  .map-page {
    height: 100%;

    // Скрывать так элемент необходимо, потому что для корректного рендера, мапбоксу нужен контейнер без display: none
    .invisible {
      opacity: 0;
    }

    .left-block {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
    .loader {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
