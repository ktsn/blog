<template lang="pug">
nav.pt-navigation
  ul.pt-navigation-list
    li.natvigation-item
      a.pt-navigation-link(href="/")
        span.pt-navigation-link-text Top
    li.pt-navigation-item
      store-link.pt-navigation-link(to="newArticle")
        span.pt-navigation-link-text New Article
</template>

<style lang="scss">
@import '~core/variables';

.pt-navigation {
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
