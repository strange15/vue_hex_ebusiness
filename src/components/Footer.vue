<template>
  <div>
    <div class="footer flex-column">
      <div class="content flex-column w-100">
        <div class="flex-row flex-spbt flex-align-start" style="width:48%;">
          <div class="flex-column flex-align-start">
            <span>SERVICE</span>
            <span>MON - FRI AM10:00 - PM17:00</span>
            <span>Homepage channel talk</span>
            <span>(02)1234-5678 / (02)8765-4321</span>
          </div>
          <div class="flex-column">
            <div class="flex-row">
              <a href="#" class="text-footer">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="text-footer">
                <i class="fab fa-github"></i>
              </a>
              <a href="#" class="text-footer">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" type="mail" class="text-footer">
                <i class="fas fa-envelope"></i>
              </a>
            </div>2020©Copyright Strange
          </div>
        </div>

        <div class="flex-column flex-spbt flex-align-start" style="width:48%;">
          <div class="flex-column flex-align-start" style="margin:1rem 0;">
            <span>HYPER COMPANY</span>
            <span>Owner Strange Wang</span>
            <span>License 111-02-01581 / Permit 2020-Strange-1004</span>
          </div>
          <div class="flex-column flex-align-start">
            <span>CONTACT</span>
            <span>111 Taiwan Taipei</span>
            <a href="mailto:donotclick@gmail.com">donotclick@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.footer {
  padding: 4rem 0;
  background: #022d6d;
  color: #fff;

  .content {
    font-weight: bold;
  }
  .text-footer {
    color: #fff;
    font-size: 1.8rem;

    &:nth-child(n + 2) {
      margin-left: 1rem;
    }
  }
}
</style>
