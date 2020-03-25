<style lang="sass">
.test
  color: red
</style>
<template>
  <div id="app">
    <span class="test">{{ message }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '这是一个测试'
    }
  },
  mounted() {
    setTimeout(() => {
      this.message = '2s后转为另一个测试'
    }, 2000)
    setTimeout(() => {
      this.test()
    }, 4000)
  },
  methods: {
    async test() {
      const a = await new Promise((resolve) => {
        resolve('这是promise返回的message')
      })
      this.message = a
    }
  }
}
</script>
