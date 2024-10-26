//扩展webpack配置
// craco.config.js
import { resolve } from 'path';

export const webpack = {
    alias: {
        '@': resolve(__dirname, 'src')
    }
};
