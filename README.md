# gulp4 多页面项目开发模板

>  ### (强调是 gulp 4.x 版本 ，3.x 版本不兼容！！)


### 安装依赖
  建议使用cnpm或者yarn安装依赖，npm可能存在问题

### 运行

 `gulp`

### 主要项目结构
```
├── /dist/              ---打包生成的文件所在
│  ├── *.html           ---对应src/pages里的html文件
│  ├── index.html       
│  ├── /js/             ---对应src/js里的js文件
│  │  └── *.js
│  ├── /static/         ---对应src/static里的静态资源文件
│  │  ├── /images/
│  │  │  └── bg.jpg
│  ├── /styles/         ---对应src/styles里的css和scss文件
│  │  ├── index.css
│  │  └── *.scss
├── /src/               ---源代码文件
│  ├── /js/             ---js                             
│  │  └── *.js
│  ├── /pages/          ---页面文件
│  │  ├── *.html
│  │  └── index.html
│  ├── /static/         ---静态资源
│  │  ├── /images/
│  │  │  └── bg.jpg
│  ├── /styles/         ---样式文件
│  │  ├── index.css
│  │  └── *.scss
│  │── /template/       ---可复用的模板html，例如 header navbar footer等公共部分
│     └── *.html
├── config.js           ---配置文件（主要包含文件路径指向、代理设置等）
├── gulpfile.js          ---gulp配置
```