<template>
  <div class="map-page">
    <map-view>
      <article
        slot="left-block"
        ref="mapContainer"
        class="tilesmap-pane"
      />
    </map-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MapView from "@/modules/map/MapView.vue";
import { MapState } from '~src/modules/map/store/state';
import { mapState } from 'vuex';
import { MainView } from '~src/modules/map/entities/views/main/MainView';

@Component({
  components: { MapView },
  mounted () {
    const mapContainer = this.$refs.mapContainer;

    new MainView(this)
      .render(mapContainer as HTMLElement);
  },
  computed: {
    ...mapState<MapState>('map', {
      isLoading: (state: MapState) => state.isLoading,
    })
  }
})
export default class MapPage extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .map-page {
      width: 100%;
      height: 100vh;

      .tilesmap-pane {
        width: 100%;
        height: 100%;
      }
    }
</style>
