<template>
  <img :src="'https://test-front.framework.team' + card.imageUrl" class="painting__img" alt="Painting" />
  <div class="painting__information">
    <p class="painting__name">{{card.name}}</p>
    <div>
      <p class="painting__author">
        Author:
        <span class="painting__authorName">{{card.author.name}}</span>
      </p>
      <p class="painting__created">
        Created:
        <span class="painting__createdYear">{{card.created}}</span>
      </p>
      <p class="painting__location">
        Location:
        <span class="painting__locationName">{{card.location.location}}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, defineProps } from 'vue';

type TCard = {
  card:{
    imageUrl: string;
    name: string;
    author:{
      name: string;
    }
    created: string;
    location:{
      location: string;
    }
  }
}

const props = defineProps<TCard>();
const { card } = toRefs(props);
</script>

<style lang="scss">
.painting {
  &__img {
    position: relative;
    width: 360px;
    height: 275px;
    border-radius: 20px;

    @media screen and (max-width: 1365px) {
      height: auto;
      width: 100%;
      aspect-ratio: 300 / 230;
    }

    @media screen and (max-width: 1023px) {
      aspect-ratio: 340 / 249;
    }

    @media screen and (max-width: 767px) {
      aspect-ratio: 280 / 205;
    }
  }

  &__name {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    text-transform: capitalize;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 95%;
  }

  &__information {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    width: 100%;
    bottom: 0;
    background: rgba(255, 255, 255, 0.75);
    box-sizing: border-box;
    height: 30px;
    padding: 5px 0 5px 15px !important;
    overflow: hidden;
    border-radius: 0 0 20px 20px;
    transition-property: all;
    transition: all ease 0.3s;

    div {
      display: none;
    }

    &:hover {
      height: 145px;
      padding: 5px 0 44px 15px;
      overflow: hidden;
      cursor: pointer;

      div {
        display: block;
      }

      p {
        overflow: visible;
        text-overflow: visible;
        white-space: normal;
      }
    }
  }

  &__author {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    color: #000000;
  }

  &__authorName {
    font-weight: 300;
    margin-left: 2px;
  }

  &__created {
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 20px;
    color: #000000;
    font-weight: 600;
  }

  &__createdYear {
    font-weight: 300;
    margin-left: 4px;
  }

  &__location {
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 20px;
    color: #000000;
    font-weight: 600;
  }

  &__locationName {
    font-weight: 300;
    margin-left: 4px;
  }
}
</style>
