import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import path from "path"
import fs from "fs"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // 启用运行时编译
            isCustomElement: () => false
          }
        }
      }),
      {
        name: 'rename-html',
        async closeBundle() {
          const src = path.resolve(__dirname, 'dist/index.html')
          const dest = path.resolve(__dirname, 'dist/idx.html')
          if (fs.existsSync(src)) {
            fs.renameSync(src, dest)
            console.log('HTML 文件已重命名为 idx.html')
          }
          await replaceHtmlContent(dest)
        }
      }
    ],
    define: {
      // Vue 3 feature flags
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // 使用包含编译器的Vue版本
        'vue': 'vue/dist/vue.esm-bundler.js'
      }
    },
    server: {
      host: 'localhost', // 确保使用localhost以支持Web Crypto API
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'https://pan.useai.sbs',
          changeOrigin: true
        },
        '/qqpd': {
          target: env.VITE_API_BASE_URL || 'https://pan.useai.sbs/',
          changeOrigin: true
        },
        '/gying': {
          target: env.VITE_API_BASE_URL || 'https://pan.useai.sbs/',
          changeOrigin: true
        },
        '/weibo': {
          target: env.VITE_API_BASE_URL || 'https://pan.useai.sbs/',
          changeOrigin: true
        }
      }
    }
  }
})

async function replaceHtmlContent(htmlFilePath, overwrite = true) {
  try {
    // 1. 解析绝对路径，避免路径问题
    const absolutePath = path.resolve(htmlFilePath);
    
    // 2. 检查文件是否存在
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`文件不存在：${absolutePath}`);
    }

    // 3. 读取 HTML 文件内容（指定 utf8 编码，避免乱码）
    const htmlContent = fs.readFileSync(absolutePath, 'utf8');

    // 4. 替换目标字符串：IUsWZevlnSDfRXk2 → <%- lis %>
    const targetStr = 'IUsWZevlnSDfRXk2';
    const replaceStr = '<%- lis %>';
    const newHtmlContent = htmlContent.replace(new RegExp(targetStr, 'g'), replaceStr);

    // 5. 检查是否有替换生效
    if (newHtmlContent === htmlContent) {
      console.log(`⚠️  文件中未找到需要替换的字符串 "${targetStr}"：${absolutePath}`);
      return;
    }

    // 6. 确定输出路径（覆盖原文件 / 输出新文件）
    const outputPath = overwrite 
      ? absolutePath 
      : `${absolutePath}.new`;

    // 7. 写入替换后的内容
    fs.writeFileSync(outputPath, newHtmlContent, 'utf8');
    console.log(`✅ 替换成功！文件路径：${outputPath}`);

  } catch (error) {
    // 统一捕获并处理所有错误
    console.error(`❌ 替换失败：${error.message}`);
    throw error; // 抛出错误，方便上层调用者处理
  }
}