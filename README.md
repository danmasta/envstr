# Envstr
Simple environment variable format converter

Features:
* Easy to use
* Transform various data formats to env variables
* Includes cli tool and node api

## About
I needed a way to transform various formats like json or table data into env variables. I wanted both a node api and cli tool for easy integration with build tools, docker, and kubernetes. This package can take output from various secret manager apis like vault and transform them into a format that can be consumed by kubernetes to create secrets or used in bash scripts.

## Usage
Add envstr as a dependency for your app and install via npm
```
npm install envstr@danmasta/envstr --save
```
Install a specific [version](https://github.com/danmasta/envstr/tags)
```
npm install envstr@danmasta/envstr#v0.0.1 --save
```
Install cli via npm
```
npm install -g danmasta/envstr
```
Import or require the package in your app
```js
import Envstr from 'envstr';
```

### Options
Name | Alias | Type | Description
-----|-------|------|------------
`string` | s | *`string`* | Text string to parse. Default is `undefined`
`stdin` | - | *`boolean`* | Read input from stdin. Default is `undefined`
`json` | j | *`boolean`* | Handle input as json. Default is `false`
`key` | k | *`string`* | If input is json, parse data at specified key. Default is `undefined`
`quotes` | q | *`boolean`* | If true add quotes around env values. Default is `false`
`newline` | n | *`string`* | Which character to use as newline delimeter. Default is `'\n'`
`include` | i | *`string`* | Which keys to include in output: `key1,key2`
`exclude` | e | *`string`* | Which keys to exclude from output: `key3,key4`
`caps` | c | *`string`* | If true capitalizes the output key name. Default is `false`
`export` | x | *`string`* | If true adds the `'export'` keyword in front of each output key. Default is `false`
`help` | h | *`boolean`* | View the cli help menu

### Methods
Name | Description
-----|------------
`pairsToStr(pairs[])` | Takes an array of `[key, val]` pairs and outputs a formatted env string
`parseTableStr(str)` | Takes table formatted string data and transforms it to an env string based on options
`parseObj(obj)` | Takes a javascript object and transforms it to an env string based on options
`parseJsonStr(str)` | Takes json formatted string data and transforms it to an env string based on options

## Examples
Use node api to convert object to env string
```js
const envstr = new Envstr({ export: true, quotes: true, caps: true });

let obj = {
    key1: true,
    key2: false
};

console.log(envstr.parseObj(obj));

// export KEY1="true"
// export KEY2="false"
```

Use cli to convert json data to env string
```bash
envstr -s '{"KEY1":true,"KEY2":false}' --json --quotes

# KEY1="true"
# KEY2="false"
```

## Testing
Tests are currently run using mocha and chai. To execute tests run `make test`. To generate unit test coverage reports run `make coverage`

## Contact
If you have any questions feel free to get in touch
