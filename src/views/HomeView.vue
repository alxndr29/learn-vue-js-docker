<script setup lang="ts">
import customApi from "@/utils/api.ts";
import {useQuery} from "@tanstack/vue-query";

const fetchData = async () => {
  const {data} = await customApi.get(
      "/article?limit=3&sortBy=createdAt&sortOrder=desc",
      {
        headers: {"Cache-Control": "no-cache"}
      }
  );
  return data;
};
const {data, isLoading, error} = useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
});

</script>

<template>
  <main>
    <div v-if="isLoading">Loading ...</div>
    <div v-else-if="error">Error ...</div>
    <div v-else>
      <ul>
        <li v-for="item in data.data" :key="data.id">
          {{ item.title }}
        </li>
      </ul>
    </div>
  </main>
</template>
