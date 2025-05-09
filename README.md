# Envstr
Simple environment variable format converter

#### Features:
* Easy to use
* Transform various data formats to env file format
* Includes node API, CLI, and standalone binary
* 0 external dependencies

## About
I needed a way to transform various formats like JSON or table data into env variables. I wanted a node API, CLI, and standalone binary for easy integration with build tools, docker, and kubernetes. This package can take output from various secret manager APIs like [vault](https://github.com/hashicorp/vault) and transform them into a format that can be consumed by kubernetes to create secrets or used in bash scripts.

## Usage
Add envstr as a dependency for your app and install via npm
```sh
npm install envstr@danmasta/envstr --save
```
Install a specific [version](https://github.com/danmasta/envstr/tags)
```sh
npm install envstr@danmasta/envstr#v0.0.1 --save
```
Install node CLI via npm
```sh
npm install -g danmasta/envstr
```
Install standalone CLI via [homebrew](https://github.com/danmasta/homebrew-tap)
```sh
brew install danmasta/tap/envstr
```
*For windows, you can download from github [releases](https://github.com/danmasta/envstr/releases)*

Import or require the package in your app
```js
import envstr from 'envstr';
```

### Options
Name | Alias | Type | Description
-----|-------|------|------------
`string` | s | *`string`* | Text string to parse. Default is `undefined`
`stdin` | - | *`boolean`* | Read input from stdin. Default is `undefined`
`json` | j | *`boolean`* | Handle input as JSON. Default is `false`
`key` | k | *`string`* | If input is JSON, parse data at specified key. Default is `undefined`
`quotes` | q | *`boolean`* | If true add quotes around each output value. Default is `false`
`newline` | n | *`string`* | Which character to use as newline delimeter. Default is `'\n'`
`include` | i | *`string`* | Which keys to include in output: `key1,key2`
`exclude` | e | *`string`* | Which keys to exclude from output: `key3,key4`
`caps` | c | *`string`* | If true capitalizes the output key name. Default is `false`
`export` | x | *`string`* | If true adds the `'export'` keyword in front of each output key. Default is `false`
`version` | v | *`boolean`* | Print the CLI version
`help` | h | *`boolean`* | View the CLI help menu

### Methods
Name | Description
-----|------------
`fromJSON(str)` | Takes JSON formatted string data and transforms it to env string format
`fromObject(obj)` | Takes a javascript object and outputs a formatted env string
`fromPairs(pairs[])` | Takes an array of `[key, val]` pairs and outputs a formatted env string
`fromTable(str)` | Takes table formatted string data and transforms it to env string format

## Examples
Use node API to convert object to env string
```js
import { fromObject } from 'envstr';

let obj = {
    name: 'app',
    env: 'dev'
};

console.log(fromObject(obj, { export: true, quotes: true, caps: true }));

// export NAME="app"
// export ENV="dev"
```

Use CLI to convert JSON data to env string
```sh
envstr -s '{"NAME":"app","ENV":"dev"}' --json --quotes

# NAME="app"
# ENV="dev"
```

Read JSON data from stdin
```sh
echo '{"NAME":"app","ENV":"dev"}' | envstr --json --quotes -

# NAME="app"
# ENV="dev"
```

## Testing
Tests are currently run using mocha and chai. To execute tests run `make test`. To generate unit test coverage reports run `make coverage`

## Contact
If you have any questions feel free to get in touch
