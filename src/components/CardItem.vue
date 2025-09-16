<script setup lang="ts">
import type {ArticleProps} from "@/types";

defineProps<{ item: ArticleProps }>();
</script>

<template>
  <div class="card card-side bg-base-100 shadow-sm mt-10">
    <figure class="shrink-0">
      <img :src="item.image" alt="item.title" class="max-w-[300px] max-h-[300px] object-contain"/>
    </figure>
    <div class="card-body">
      <h2 class="card-title text-primary">{{ item.title }}</h2>
      <div class="badge badge-success">{{ item.category.name }}</div>
      <p>{{ item.content.substring(0, 200) }}</p>
      <div class="card-actions justify-between">
        <div>
          <p><span class="font-bold">Written By: {{ item.user.name }}</span></p>
          <span class="text-secondary">{{ new Date(item.createdAt).toDateString() }}</span>
        </div>
        <RouterLink :to="{name:'DetailArticle',params:{id:item.id}}">
          <button class="btn btn-primary">Detail</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
