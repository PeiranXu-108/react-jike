//扩展webpack配置
// craco.config.js
const path = require('path');

console.log("Craco Config is loaded!"); // 确认加载了该配置

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
};
