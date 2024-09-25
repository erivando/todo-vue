<script setup>
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
    <a-layout class="layout n-height">
		<TheHeader />
        <a-layout-content class="px">
            <slot></slot>
        </a-layout-content>
  </a-layout>
</template>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}

.n-height {
  min-height: 100vh !important;
}
.content {
  /* background-color: #fff; */
  /* padding: 24px; */
  min-height: 280px;
  margin-top: 45px;
}
.px {
  padding: 0 50px;
}

@media only screen and (max-width: 446px) {
  .px {
    padding: 0 10px;
  }
}
</style>