<template lang="pug">
nav.navigation
  ul.navigation-list
    li.natvigation-item
      a.navigation-link(href="/")
        span.navigation-link-text Top
    li.navigation-item
      store-link.navigation-link(to="new-article")
        span.navigation-link-text New Article
</template>

<style lang="scss">
@import '~core/variables';

.navigation {
  display: block;
  background-color: $c-color-base;

  &-list {
    display: flex;
  }

  &-link {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 25px;
    height: 40px;

    &::after {
      content: '';
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #fff;
      transition: opacity $transition-hover;
    }

    &:hover {
      text-decoration: none;

      &::after {
        opacity: 0.2;
      }
    }

    &-text {
      color: #fff;
    }
  }
}
</style>
