<template>
  <div class="about">
    <div class="container mb-5">
      <div class="title">
        關於我們
      </div>
      <div class="description">
        <img src="../../assets/images/about/about.jpg" alt="">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, quo.</p>
        <P>Lorem ipsum dolor sit amet.</p>
        <P>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <P>Lorem ipsum dolor sit amet.</p>
        <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae provident soluta expedita?</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
  },
  created() {
  },
};
</script>
<style lang="less" scope>
.about {
  background: #022d6d;
  color: #fff;
  padding: 1rem 0;

  .title {
    font-size: 2.6rem;
    border-bottom: 1px solid #fff;
    padding-bottom: .5rem;
    width: 100%;
    font-weight: bold;
  }
  .description {
    font-size: 2rem;
    margin: 1rem 0;
    border-bottom: 1px solid #fff;
    padding-bottom: .5rem;

    img {
      width: 35rem;
    }
  }
}
</style>