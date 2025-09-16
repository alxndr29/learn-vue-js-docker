<script setup lang="ts">
import {useQuery} from "@tanstack/vue-query";
import {useRoute} from "vue-router";
import customApi from "@/utils/api.ts";
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";

let route = useRoute();

const fetchData = async () => {
  const {data} = await customApi.get(`/article/${route.params.id}`)
  return data;
};

const {data, isLoading, error} = useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
});

</script>
<template>
  <article>
    <div v-if="isLoading" key="loading"
         class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <Loading class="mb-4"/>
    </div>
    <div v-else-if="error" key="error">
      <Error/>
    </div>
    <section v-else>
      <h1 class="text-info text-4xl font-bold">{{ data.title }}</h1>
      <span class="badge badge-success">{{ data.category.name }}</span>
      <section class="my-3 border-b border-info py-5">
        <span class="font-bold">Writen by: </span>{{ data.user.name }}
        <span>{{ new Date(data.createdAt).toDateString() }}</span>
      </section>
      <section class="my-3 border-b border-info py-5 mb-5">
        <img :src="data.image" class="object-cover mx-auto" alt="image"/>
      </section>
      <section class="my-3 border-b border-info py-5 mb-5">
        <p>{{ data.content }}</p>
      </section>
      <div class="badge badge-success mr-3" v-for="articleTag in data.articleTags" :key="articleTag.id"
           v-if="data.articleTags && data.articleTags.length">
        {{ articleTag.tag.name }}
      </div>
    </section>
    <section class="my-5">
      <h1 class="text-2xl font-bold text-info my-2">List Comment:</h1>
      <div class="card card-border border-info bg-base-300" v-for="comment in data.comments"
           v-if="data.comments && data.comments.length" :key="comment.id">
        <div class="card-body">
          <h2 class="card-title">{{ comment.user.name }}</h2>
          <p>{{ comment.content }}</p>
          <small class="text-xs">
            {{ new Date(comment.createdAt).toDateString()}}
          </small>
        </div>
      </div>
    </section>
  </article>
</template>

