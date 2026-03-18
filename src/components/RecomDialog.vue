<template>
  <div div v-if="visible" class="modal-overlay">
    <div class="modal-container">
      <!-- 弹窗头部 -->
      <div class="modal-header">
        <h3 class="modal-title">资料详情</h3>
        <button class="close-btn" @click="handelClose">×</button>
      </div>
      <!-- 弹窗内容 -->
      <div class="modal-body">
        <div class="resource-card">
          <div class="resource-item">
            <span class="item-label">资料名称：</span>
            <span class="item-value">{{ recomData.name }}</span>
          </div>
          <div class="resource-item">
            <span class="item-label">存储类型：</span>
            <span class="item-value">{{ recomData.pan_type }}</span>
          </div>
          <div class="resource-item">
            <span class="item-label">链接地址：</span>
            <div class="item-value">
              <div class="link-row">
                <span class="link-text" >{{ recomData.link }}</span>
                <button class="copy-link-btn" @click="handleCopy">复制链接</button>
              </div>
            </div>
          </div>
          <div class="resource-item">
            <span class="item-label">更新日期：</span>
            <span class="item-value">{{ recomData.date }}</span>
          </div>
          <div class="resource-item">
            <span class="item-label">资源状态：</span>
            <span class="item-value">有效</span>
          </div>
        </div>
      </div>
      <!-- 弹窗底部 -->
      <div class="modal-footer">
        <button class="confirm-btn" @click="handelClose">关闭</button>
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
const copySuccess = ref(false);
let copyAnState = false;
const recomData = reactive({
  name: "",
  pan_type: "",
  link: "",
  date: "",
  s_id: ""
})
// TODO 完成子组件数据展示
const emit = defineEmits(['colseRecomDialog'])
const handelClose = () => {
  emit('colseRecomDialog', false) // 传递要修改的新值
}
const handleCopy = () => {
  if (copyAnState) {
    return;
  }
  copyAnState = true;
  navigator.clipboard.writeText(recomData.link);
  copySuccess.value = true;
  setTimeout(() => {
    copySuccess.value = false;
    copyAnState = false;
  }, 1500);
}
const handleOpenLink = () => {
  window.open(recomData.link, '_blank', 'noopener,noreferrer');
}
watch(() => props.visible, (newVal) => {
  if (newVal) {
    let recom = window.recom_list.find(item => item.s_id === props.sid)
    Object.assign(recomData, recom);
  }
});

</script>

<style scoped>
/* 弹窗遮罩层 */
.modal-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: all 0.3s ease;
}

/* 弹窗显示状态 */
.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 弹窗容器 */
.modal-container {
  background-color: white;
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transform: scale(0.95);
  transition: transform 0.3s ease;
}

.modal-overlay.active .modal-container {
  transform: scale(1);
}

/* 弹窗头部 */
.modal-header {
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f1f3f5;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6b7280;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #e5e7eb;
  color: #374151;
}

/* 弹窗内容区 */
.modal-body {
  padding: 24px 20px;
}

/* 资料卡片 */
.resource-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.resource-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.item-label {
  min-width: 80px;
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  padding-top: 2px;
}

.item-value {
  flex: 1;
  font-size: 15px;
  color: #1f2937;
  line-height: 1.5;
}

/* 链接展示行 */
.link-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-top: 4px;
}

.link-text {
  flex: 1;
  font-size: 14px;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-link-btn {
  padding: 6px 12px;
  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-link-btn:hover {
  background-color: #0958d9;
}

/* 弹窗底部 */
.modal-footer {
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.confirm-btn {
  padding: 8px 20px;
  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.confirm-btn:hover {
  background-color: #0958d9;
}

/* 复制成功提示 */
.copy-tooltip {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 1001;
}

.copy-tooltip.active {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}
@media (max-width: 768px) {
  .link-row {
    flex-wrap: wrap;
    flex-direction: column; 
  }
  .link-text{
    display: block;
    max-width: 170px;
  }
}
</style>