# webpack-vue-demo
基于webpack手动搭建vue + ts环境

## 在之前的js基础上搭建

安装必要模块

```js
npm i vue-class-component vue-property-decorator --save
npm i ts-loader typescript tslint tslint-loader tslint-config-standard --save-dev
```

### 修改webpack.base.conf.js

**修改入口文件为main.ts**

添加对ts的支持

```js
{
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [
    'babel-loader',
    {
      loader: 'ts-loader',
      options: { appendTsxSuffixTo: [/\.vue$/] }
    },
    {
      loader: 'tslint-loader'
    }
  ]
}
```

### 新建shims-vue.d.ts识别vue文件

```js
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

### 新建shims-tsx.d.ts识别tsx

```js
import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
```

### 添加tsconfig.json

```js
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### 添加tslint.json

```js
{
  "defaultSeverity": "error",
  "extends": "tslint-config-standard",
  "globals": {
    "require": true
  },
  "rules": {
    "space-before-function-paren": false,
    "whitespace": [false],
    "no-consecutive-blank-lines": false,
    "no-angle-bracket-type-assertion": false,
    "no-empty-character-class": false,
    "deprecation": false,
    "no-floating-promises": false,
    "no-unnecessary-qualifier": false,
    "strict-type-predicates": false,
    "no-unnecessary-type-assertion": false
  }
}
```

`这样就可以以ts的方式书写Vue了`

[tslint rules](https://palantir.github.io/tslint/rules/)
