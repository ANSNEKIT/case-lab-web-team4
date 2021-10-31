<template>
  <div
    :class="{'btn-active' : active, 'btn-blue' :  btnBlue, 'btn-orange' : btnOrange}"
    class="btn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    active: Boolean,
    btnBlue: {
      type: Boolean,
      default: false,
    },
    btnOrange: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 24px;
  font-size: 14px ;
  font-weight: 700;
  border-radius: 22px;
  cursor: pointer;
  transition: 0.4s;
  background: #ffffff;

  &:hover {
    filter: brightness(90%);
  }
}

.btn-active {
  color: #ffffff;
  background: #5a2dda;
  filter: brightness(100%) !important;

  border: none; //on click remove border
}

.btn-blue {
  $blueBgColor: rgba(42, 123, 169, 0.78);
  $blueTextColor: rgb(255,255,255);
  background: $blueBgColor;
  color: $blueTextColor;

  &:hover{
    background: darken($blueBgColor, 10%);
  }
}

.btn-orange {
  $orangeBgColor: rgb(255, 165, 0);
  $orangeTextColor: rgb(255,255,255);
  background: $orangeBgColor;
  color: $orangeTextColor;

  &:hover{
    background: darken($orangeBgColor, 10%);
  }

}
</style>
