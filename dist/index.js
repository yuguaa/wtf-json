!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).wtfJson=t()}(this,(function(){"use strict";class e{getErrorMessage(e){return`"${e.value}" is not valid JSON\nline: ${e.startLine}, column: ${e.startColumn}`}formatStr(e){const t=/(`|'|")/.test(e.charAt(0))&&/(`|'|")/.test(e.charAt(e.length-1))?e.substring(1,e.length-1):e;return t.replace(/\\(.)/g,(function(e,t){return"n"===t?"\n":"r"===t?"\r":"t"===t?"\t":"b"===t?"\b":"f"===t?"\f":"v"===t?"\v":t}))}appendBoolean(e){return{type:"BOOLEAN",value:"TRUE_BOOLEAN"===e.type}}appendNullValue(e){return{type:"NULL_VALUE",value:null}}appendString(e){return{type:"STRING",value:this.formatStr(e.value)}}appendArray(e){return{type:"ARRAY",properties:[]}}appendObject(e){return{type:"OBJECT",properties:[]}}appendNumber(e){return{type:"NUMBER",value:Number(e.value)}}appendKey(e){return{type:"OBJECT_KEY",name:this.formatStr(e.value),value:null}}buildAST(e){const t={type:"JSON",value:null},n=[t];for(let t=0;t<e.length;++t){const s=e[t],p=n[n.length-1],r=e=>{"value"in p?p.value=e:p.properties.push(e)};if("TRUE_BOOLEAN"===s.type||"FALSE_BOOLEAN"===s.type)r(this.appendBoolean(s));else if("NULL"===s.type)r(this.appendNullValue(s));else if("NUMBER"===s.type)r(this.appendNumber(s));else if("STRING"===s.type||"UNKNOWN"===s.type)if("OBJECT_KEY"===p.type&&null!==p.value&&n.pop(),"OBJECT"===p.type){const e=this.appendKey(s);r(e),n.push(e)}else r(this.appendString(s));else if("START_BRACKET"===s.type){const e=this.appendArray(s);r(e),n.push(e)}else if("START_BRACE"===s.type){const e=this.appendObject(s);r(e),n.push(e)}else"END_BRACKET"===s.type?n.pop():"END_BRACE"===s.type?("OBJECT_KEY"===p.type&&n.pop(),n.pop()):"COMA"===s.type?"OBJECT_KEY"===p.type&&n.pop():s.type;s.type}return t}}const t={tokens:{},defaultType:"UNKNOWN",concatDefaultType:!0,callback:e=>e};class n{constructor(e={}){this.options={},this.options=Object.assign({},t,e)}setDefaultType(e){this.options.defaultType=e}getDefaultType(){return this.options.defaultType}getTokens(){return this.options.tokens}addToken(e,t){this.options.tokens[e]=t}setCallback(e){this.options.callback=e}matcher(e,t,n){n.lastIndex=0;const s=n.exec(e);return s&&0===s.index?{type:t,wordLength:s[0].length}:{type:this.options.defaultType,wordLength:1}}tokenize(e){var t,n;const s=[],p=e.split(/\n/g);let r=0;for(let o=0;o<p.length;++o){const l=p[o];for(let p=0;p<l.length;++p){const l=p+r;let i=null;for(const[t,n]of Object.entries(this.options.tokens))if(i=this.matcher(e.substring(l,e.length),t,n),i.type!==this.options.defaultType)break;const a=e.substring(l,l+i.wordLength),u=null!==(n=null===(t=a.match(/\n/g))||void 0===t?void 0:t.length)&&void 0!==n?n:0,h=this.options.callback({type:i.type,value:a,startLine:o,startColumn:p,endLine:o+u,endColumn:p+i.wordLength-1});if(this.options.concatDefaultType&&h.type===this.options.defaultType&&0!==s.length&&s[s.length-1].type===this.options.defaultType){const e=s[s.length-1];e.value+=h.value,e.endColumn=h.endColumn,e.endLine=h.endLine}else s.push(h);p+=i.wordLength-1}r+=l.length+1}return s}}const s={STRING:/("|'|`)(?:\\\1|.|\n)*?\1/,NUMBER:/\d+(?:.\d+)?/,WHITE_SPACE:/\s+/,COMA:/,/,COLON:/:/,TRUE_BOOLEAN:/true/,FALSE_BOOLEAN:/false/,NULL:/null/,START_BRACKET:/\[/,END_BRACKET:/\]/,START_BRACE:/\{/,END_BRACE:/\}/};const p=new class{constructor(){this.tokenizer=new n({tokens:s}),this.astBuilder=new e}parse(e){e=String(e);const t=this.tokenizer.tokenize(e);console.log(t);const n=this.astBuilder.buildAST(t);return console.log(n),this.parseASTBranch(n.value)}parseASTBranch(e){return"OBJECT"===e.type?this.parseObject(e):"ARRAY"===e.type?this.parseArray(e):this.parsePrimitif(e)}parseArray(e){const t=[];for(const n of e.properties)t.push(this.parseASTBranch(n));return t}parseObject(e){const t={};for(const n of e.properties)t[n.name]=this.parseASTBranch(n.value);return t}parsePrimitif(e){return e.value}};return p.parse.bind(p)}));
//# sourceMappingURL=index.js.map
