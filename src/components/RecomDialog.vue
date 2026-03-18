<template>
  <div div v-if="visible" class="recom-overlay">
    <div class="recom-dialog">
      <div class="recom_li">
        <div class="recom_h1" style="padding-bottom: 20px;">飞驰人生3</div>
      </div>
      <div class="recom_li">
        <div class="recom_desc">File:</div>
        <div class="recom_text">飞驰人生3</div>
      </div>
      <div class="recom_li">
        <div class="recom_desc">分享时间：</div>
        <div class="recom_text">2026-02-10 17:50:26</div>
      </div>
      <div class="recom_li">
        <div class="recom_desc">网盘类型：</div>
        <div class="recom_text">百度网盘</div>
      </div>
      <div class="recom_li">
        <div class="recom_desc">链接：</div>
        <div class="recom_link">https://pan.baidu.com/dshjkdhskj</div>
        <div class="recom_copy">复制</div>
      </div>
      <div class="recom_action">
        <button class="login-button">
          访问链接
        </button>
        <button class="login-button" @click="handelClose">
          关闭
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  sid: {
    type: String,
    required: true
  }
})
// TODO 完成子组件数据展示
const emit = defineEmits(['colseRecomDialog'])
const handelClose = () =>{
emit('colseRecomDialog', false) // 传递要修改的新值
}

</script>

<style scoped>
.recom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease-out;
}

.recom-dialog {
  background: hsl(var(--background));
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
  border: 1px solid hsl(var(--border));
}

.recom_h1 {
  font-size: 32px;
  line-height: 44px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-weight: 600;
  margin: 0;
}

.recom_li {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  align-items: flex-start;
  margin-bottom: 10px;
}

.recom_desc {
  font-size: 14px;
  font-weight: 400;
  color: #1c1f239e;
  min-width: 80px;
  flex-shrink: 0;
  user-select: none;
}

.recom_text {
  font-size: 14px;
}

.recom_link {
  font-size: 14px;
  font-weight: 400;
  color: #0064fa;
  cursor: pointer;
  text-decoration: underline;
}

.recom_copy {
  font-size: 14px;
  font-weight: 400;
  color: #3bb346;
  margin-left: 8px;
}


.recom_action {
  margin-top: 20px;
}

.login-button {
  padding: 0.75rem 1.5rem;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  margin-right: 10px;
}

.login-button:hover:not(:disabled) {
  background: hsl(var(--primary) / 0.9);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px hsla(var(--primary), 0.3);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>