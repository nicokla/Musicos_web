// import vue from '@vitejs/plugin-vue'

// /**
//  * https://vitejs.dev/config/
//  * @type {import('vite').UserConfig}
//  */
// export default {
//   plugins: [vue()]
// }

import vue from '@vitejs/plugin-vue'
import Components from 'vite-plugin-components'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'

export default {
  plugins: [
    vue(),
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
  ],
}
