<template>
  <div class="pages-content-scroll">
    <el-backtop target=".pages-content-scroll"></el-backtop><!-- target是绑定容器的类名 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style scoped lang="scss">
  .pages-content-scroll {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x: hidden;
  }
</style>
