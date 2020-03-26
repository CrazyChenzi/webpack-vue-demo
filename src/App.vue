<style lang="sass">
.test
  color: red
</style>
<template>
  <div id="app">
    <span class="test">{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {
  public message = '这是一个测试'
  private mounted() {
    setTimeout(() => {
      this.message = '2s后的变化'
    }, 2000)
    setTimeout(async () => {
      await this.test()
    }, 4000)
  }
  private async test() {
    const message: string = await new Promise((resolve) => {
      resolve('promise返回')
    })
    this.message = message
  }
}
</script>
