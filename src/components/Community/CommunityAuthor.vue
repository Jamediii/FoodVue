<template>
  <div>
    <!--显示作者简介：-->
    <author-brief></author-brief>
    <!--展示作者全部作品：-->
    <author-works></author-works>
  </div>
</template>


<script>
  import AuthorBrief from '../Community/AuthorBrief.vue'
  import AuthorWorks from '../Community/AuthorWorks.vue'

  export default {
    name: "Author",
    components:{
      'author-brief':AuthorBrief,
      'author-works':AuthorWorks
    }
  }
</script>

<style scoped>

</style>
