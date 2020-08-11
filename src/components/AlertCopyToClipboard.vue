<template>
  <div class="message-copy">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click.stop.prevent="copyOrderId(item.message)"
        aria-label="Close"
      >
        <span aria-hidden="true">複製訂單編號</span>
      </button>
      <!--  利用 input hidden 埋要被複製的值  -->
      <input type="hidden" id="testing-code" :value="item.message" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Copy",
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 10000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
    copyOrderId(id) {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        alert("訂單編號已複製了: " + id);
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on("message:copy", (message, status = "warning") => {
      vm.updateMessage(message, status);
    });
  },
};
</script>

<style scope>
.message-copy {
  position: fixed;
  max-width: 50%;
  top: 130px;
  right: 20px;
  z-index: 1100;
}
.alert-dismissible .close {
  font-size: .5rem;
  top: 50%;
  transform: translateY(-50%);
}
.alert-dismissible {
  padding-right: 7rem;
}
</style>