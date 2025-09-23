<script setup lang="ts">
import customApi from "@/utils/api.ts";
import {useQuery} from "@tanstack/vue-query";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const titleInput = ref((route.query.title as string) || null);
const categoryInput = ref((route.query.categoryId as string) || null);
const sortInput = ref((route.query.sortBy as string) || "createdAt");
const sortOrderInput = ref((route.query.sortOrder as string) || "desc");

const fetchDataCategory = async () => {
  const {data} = await customApi.get("/category");
  return data;
};
const {data, isLoading, error} = useQuery({
  queryKey: ["categories"],
  queryFn: fetchDataCategory,
});

const handleFilter = () => {
  router.push({
    query: {
      ...route.query,
      title: titleInput.value,
      sortBy: sortInput.value,
      sortOrder: sortOrderInput.value,
      categoryId: categoryInput.value,
      page: "1",
      limit: "3",
    }
  });
};
</script>
<template>
  <fieldset class="fieldset bg-base-300 border-info rounded-box border p-4">
    <legend class="fieldset-legend">Filter</legend>
    <form @submit.prevent="handleFilter">
      <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
        <input type="text" class="input w-full" placeholder="Search" v-model="titleInput"/>
        <select v-model="categoryInput" class="select w-full">
          <option value="" disabled>Select Category</option>
          <option v-if="isLoading">Loading ...</option>
          <option v-else-if="error">Category Error ...</option>
          <option v-else v-for="category in data" :value="category.id" :key="category.id">
            {{ category.name }}
          </option>
        </select>
        <select v-model="sortInput" class="select w-full">
          <option disabled>Sort Input</option>
          <option value="createdAt">Tanggal Buat</option>
          <option value="title">Judul Artikel</option>
          <option value="category">Category</option>

        </select>
        <select v-model="sortOrderInput" class="select w-full">
          <option disabled>Sort By</option>
          <option value="asc">Lama ke baru</option>
          <option value="desc">Baru ke lama</option>
        </select>
      </div>
      <button class="btn btn-primary btn-block mt-4" type="submit">Filter</button>
    </form>
    <RouterLink :to="{name:'Article'}" class="btn btn-error btn-block mt-4">
      Reset
    </RouterLink>
  </fieldset>
</template>
