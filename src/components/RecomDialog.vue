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
            <span class="item-value" style="font-weight: 700;">{{ recomData.name }}</span>
          </div>
          <div class="resource-item">
            <span class="item-label">存储类型：</span>
            <span class="item-value">{{ recomData.pan_type }}</span>
          </div>
          <div class="resource-item">
            <span class="item-label">链接地址：</span>
            <div class="item-value">
              <div class="link-row">
                <div class="copy_hint" :class="copySuccess ? 'copy_hint_success' : ''">复制成功</div>
                <input class="link-text" type="text" :value="recomData.link">
                <!-- <div class="link-text"></div> -->
                <button class="copy-link-btn" @click="handleCopy">复制链接</button>
              </div>
            </div>
          </div>
          <div class="resource-item">
            <span class="item-label">资源密码：</span>
            <span class="item-value" style="text-decoration: underline;">{{ recomData.pwd }}</span>
          </div>
          <div class="resource-item">
            <span class="item-label">更新日期：</span>
            <span class="item-value">{{ recomData.date }}</span>
          </div>
          <div class="resource-item">
            <span class="item-label">资源状态：</span>
            <span class="item-value" style="color: #3bb346;">有效</span>
          </div>
        </div>
      </div>
      <!-- 弹窗底部 -->
      <div class="modal-footer">
        <button class="dialog-btn" @click="handleOpenLink">访问链接</button>
        <button class="dialog-btn" @click="handelClose">关闭</button>
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
div {
  box-sizing: border-box;
}

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
  width: 100%;
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
  position: relative;
  width: 100%;
}

.copy_hint {
  position: absolute;
  top: 0px;
  right: 18px;
  z-index: 2;
  opacity: 0;
  transition: all 0.2s ease;
  color: #1677ff;
}

.copy_hint_success {
  opacity: 1;
  transform: translateY(-120%);
}

.link-text {
  flex: 1;
  font-size: 14px;
  color: #374151;
  white-space: wrap;
  overflow: hidden;
  outline: none;
  background-color: #f9fafb;
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
  z-index: 10;
  max-width: 85px;
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

.dialog-btn {
  padding: 8px 20px;
  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 10px;
}

.dialog-btn:hover {
  background-color: #0958d9;
}



@media (max-width: 768px) {
  .link-row {
    flex-wrap: wrap;
    flex-direction: column;
    padding: 8px 4px;
    align-items: start;
  }

  .link-text {
    display: block;
    width: 100%;
  }
}
</style>