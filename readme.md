# rollup-plugin-riot-register
Rollup plugin for registering riot.js components.

Compatible with Rollup 3

NPM: https://www.npmjs.com/package/rollup-plugin-riot-register

How it works:
it is a plugin for Rollup, to generate code on the fly to register riot.js componets.
rollup.config.mjs to provide locations to scan for riot.js components.
entry point [./src/index.js] to call generated code to register all found compoents. 

---
Usage:
---

Install from NPM:
```bash
npm install rollup-plugin-riot-register
```

Configuration:

in your rollup.config.mjs 

```js
import rollupRiotRegister from 'rollup-plugin-riot-register'
export default {
  input: './src/index.js',
  plugins: [
    rollupRiotRegister( [ './src/components/global/**/*.riot', './src/components/local/**/*.riot' ] )
  ]
}
```

in ./src/index.js
```js
import { mount } from 'riot'
import registerComponents from 'riot:components'

// register
registerComponents()

mount('[data-riot-component]')
```
