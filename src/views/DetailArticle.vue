<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import customApi from "@/utils/api.ts";
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import CommentForm from "@/components/CommentForm.vue";
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";

const isUpdate = ref<boolean>(false)
const handleUpdate = () => {
  isUpdate.value = true
}
const handleCloseUpdate = () => {
  isUpdate.value = false
}

let route = useRoute();
const authStore = useAuthStore();

const fetchData = async () => {
  const { data } = await customApi.get(`/article/${route.params.id}`)
  return data;
};



const { data, isLoading, error } = useQuery({
  queryKey: ["ArticleDataDetail"],
  queryFn: fetchData,
});

const fetchDataArticleComment = async () => {
  const { data } = await customApi.get(`/comment/${route.params.id}`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`
    }
  })
  console.log(data)
  return data;
};
const { data: dataComment, isLoading: isLoadingComment, error: errorComment } = useQuery({
  queryKey: ["ArticleCOmmentStatus"],
  queryFn: fetchDataArticleComment,
  enabled: !!authStore.token
});

</script>
<template>
  <article>
    <div v-if="isLoading" key="loading"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <Loading class="mb-4" />
    </div>
    <div v-else-if="error" key="error">
      <Error />
    </div>
    <section v-else>
      <h1 class="text-info text-4xl font-bold">{{ data.title }}</h1>
      <span class="badge badge-success">{{ data.category?.name }}</span>
      <section class="my-3 border-b border-info py-5">
        <span class="font-bold">Writen by: </span>{{ data.user?.name }}
        <span>{{ new Date(data.createdAt).toDateString() }}</span>
      </section>
      <section class="my-3 border-b border-info py-5 mb-5">
        <img :src="data.image" class="object-cover mx-auto" alt="image" />
      </section>
      <section class="my-3 border-b border-info py-5 mb-5">
        <p>{{ data.content }}</p>
      </section>
      <div class="badge badge-success mr-3" v-for="articleTag in data.articleTags" :key="articleTag.id"
        v-if="data?.articleTags && data.articleTags?.length">
        {{ articleTag.tag.name }}
      </div>
    </section>
    <div v-if="isLoadingComment">
      <Loading /> Loading ...
    </div>
    <div v-else-if="dataComment && !dataComment.status">
      <CommentForm :ArticleId="route.params.id" :isUpdate="false" />
    </div>

    <section class="my-5">
      <h1 class="text-2xl font-bold text-info my-2">List Comment:</h1>
      <div class="card card-border border-info bg-base-300" v-for="comment in data.comments"
        v-if="data?.comments && data.comments?.length" :key="comment.id">
        <div class="card-body">
          <h2 class="card-title">{{ comment.user.name }}</h2>
          <p>{{ comment.content }}</p>
          <small class="text-xs">
            {{ new Date(comment.createdAt).toDateString() }}
          </small>
          <div class="flex justify-end" v-if="dataComment && dataComment.status && dataComment.id === comment.id">
            <button class="btn btn-accent btn-md" v-if="!isUpdate" @click="handleUpdate">Update</button>
            <button class="btn btn-accent btn-md" v-else @click="handleCloseUpdate">Cancel</button>
          </div>
          <div v-if="isUpdate && comment.id === dataComment.id">
            <CommentForm :ArticleId="route.params.id" :isUpdate="true" :content="comment.content" />
          </div>

        </div>

      </div>
      <div v-else>
        <h1 class="text-xl font-bold">Belum ada komentar</h1>
      </div>
    </section>
  </article>
</template>
