<script setup>
import { ref, onMounted } from 'vue';

// 状态管理
const activeTab = ref('movie');
const movieData = ref([]);
const dramaData = ref([]);
const varietyData = ref([]);

// 提取导演信息
const extractDirector = (cardSubtitle) => {
  const parts = cardSubtitle.split(' / ');
  if (parts.length >= 4) {
    return parts[3];
  }
  return '';
};

// 加载数据
onMounted(() => {
  // 从全局变量获取数据
    movieData.value = window.movie_data.data.items;
    dramaData.value = window.drama_data.data.items;
    varietyData.value = window.variety_data.data.items;
});

// 获取当前激活的数据
const getCurrentData = () => {
  switch (activeTab.value) {
    case 'movie':
      return movieData.value;
    case 'drama':
      return dramaData.value;
    case 'variety':
      return varietyData.value;
    default:
      return [];
  }
};
const emit = defineEmits(['searchBySource'])
// 点击事件处理
const handleClick = (item) => {
   emit('searchBySource', item.title) // 传递要修改的新值
};
</script>

<template>
  <div class="source-tab">
    <!-- 标签切换 -->
    <div class="tabs">
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'movie' }"
        @click="activeTab = 'movie'"
      >
        电影
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'drama' }"
        @click="activeTab = 'drama'"
      >
        剧集
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'variety' }"
        @click="activeTab = 'variety'"
      >
        综艺
      </button>
    </div>

    <!-- 影视卡片列表 -->
    <div class="movie-grid">
      <div 
        v-for="item in getCurrentData()" 
        :key="item.id"
        class="movie-card"
        @click="handleClick(item)"
      >
        <!-- 海报 -->
        <div class="movie-poster">
          <img :src="item.pic.normal" :alt="item.title" />
        </div>
        
        <!-- 信息 -->
        <div class="movie-info">
          <h3 class="movie-title">{{ item.title }}</h3>
          <div class="movie-rating">
            <span class="rating-value">{{ item.rating.value.toFixed(1) }}</span>
            <span class="rating-count">({{ item.rating.count.toLocaleString() }})</span>
          </div>
          <div class="movie-director">
            <span class="director-label">导演：</span>
            <span class="director-name">{{ extractDirector(item.card_subtitle) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.source-tab {
  padding: 20px 0;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 10px;
}

.tab-button {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.tab-button:hover {
  background: #f3f4f6;
}

.tab-button.active {
  background: #0057ff;
  color: white;
  border-color: #0057ff;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.movie-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.movie-poster {
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.movie-card:hover .movie-poster img {
  transform: scale(1.05);
}

.movie-info {
  padding: 12px;
}

.movie-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 14px;
}

.rating-value {
  font-weight: 600;
  color: #ff6b6b;
}

.rating-count {
  color: #6b7280;
  font-size: 12px;
}

.movie-director {
  font-size: 14px;
  color: #4b5563;
}

.director-label {
  font-weight: 500;
  color: #6b7280;
}

.director-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .movie-poster {
    height: 200px;
  }

  .movie-title {
    font-size: 14px;
  }

  .movie-director {
    font-size: 12px;
  }
}
</style> 