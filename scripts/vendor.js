"use strict";!function(t){function n(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function e(t){return"string"!=typeof t&&(t=String(t)),t}function r(t){this.map={},t instanceof r?t.forEach(function(t,n){this.append(n,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(n){this.append(n,t[n])},this)}function o(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function i(t){return new Promise(function(n,e){t.onload=function(){n(t.result)},t.onerror=function(){e(t.error)}})}function u(t){var n=new FileReader;return n.readAsArrayBuffer(t),i(n)}function a(t){var n=new FileReader;return n.readAsText(t),i(n)}function s(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,"string"==typeof t)this._bodyText=t;else if(d.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(d.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(t){if(!d.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t))throw new Error("unsupported BodyInit type")}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type&&this.headers.set("content-type",this._bodyBlob.type))},d.blob?(this.blob=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(u)},this.text=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return a(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var t=o(this);return t?t:Promise.resolve(this._bodyText)},d.formData&&(this.formData=function(){return this.text().then(l)}),this.json=function(){return this.text().then(JSON.parse)},this}function f(t){var n=t.toUpperCase();return y.indexOf(n)>-1?n:t}function c(t,n){n=n||{};var e=n.body;if(c.prototype.isPrototypeOf(t)){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,n.headers||(this.headers=new r(t.headers)),this.method=t.method,this.mode=t.mode,e||(e=t._bodyInit,t.bodyUsed=!0)}else this.url=t;if(this.credentials=n.credentials||this.credentials||"omit",(n.headers||!this.headers)&&(this.headers=new r(n.headers)),this.method=f(n.method||this.method||"GET"),this.mode=n.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&e)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(e)}function l(t){var n=new FormData;return t.trim().split("&").forEach(function(t){if(t){var e=t.split("="),r=e.shift().replace(/\+/g," "),o=e.join("=").replace(/\+/g," ");n.append(decodeURIComponent(r),decodeURIComponent(o))}}),n}function p(t){var n=new r,e=t.getAllResponseHeaders().trim().split("\n");return e.forEach(function(t){var e=t.trim().split(":"),r=e.shift().trim(),o=e.join(":").trim();n.append(r,o)}),n}function h(t,n){n||(n={}),this.type="default",this.status=n.status,this.ok=this.status>=200&&this.status<300,this.statusText=n.statusText,this.headers=n.headers instanceof r?n.headers:new r(n.headers),this.url=n.url||"",this._initBody(t)}if(!t.fetch){r.prototype.append=function(t,r){t=n(t),r=e(r);var o=this.map[t];o||(o=[],this.map[t]=o),o.push(r)},r.prototype["delete"]=function(t){delete this.map[n(t)]},r.prototype.get=function(t){var e=this.map[n(t)];return e?e[0]:null},r.prototype.getAll=function(t){return this.map[n(t)]||[]},r.prototype.has=function(t){return this.map.hasOwnProperty(n(t))},r.prototype.set=function(t,r){this.map[n(t)]=[e(r)]},r.prototype.forEach=function(t,n){Object.getOwnPropertyNames(this.map).forEach(function(e){this.map[e].forEach(function(r){t.call(n,r,e,this)},this)},this)};var d={blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t},y=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];c.prototype.clone=function(){return new c(this)},s.call(c.prototype),s.call(h.prototype),h.prototype.clone=function(){return new h(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new r(this.headers),url:this.url})},h.error=function(){var t=new h(null,{status:0,statusText:""});return t.type="error",t};var v=[301,302,303,307,308];h.redirect=function(t,n){if(-1===v.indexOf(n))throw new RangeError("Invalid status code");return new h(null,{status:n,headers:{location:t}})},t.Headers=r,t.Request=c,t.Response=h,t.fetch=function(t,n){return new Promise(function(e,r){function o(){return"responseURL"in u?u.responseURL:/^X-Request-URL:/m.test(u.getAllResponseHeaders())?u.getResponseHeader("X-Request-URL"):void 0}var i;i=c.prototype.isPrototypeOf(t)&&!n?t:new c(t,n);var u=new XMLHttpRequest;u.onload=function(){var t={status:u.status,statusText:u.statusText,headers:p(u),url:o()},n="response"in u?u.response:u.responseText;e(new h(n,t))},u.onerror=function(){r(new TypeError("Network request failed"))},u.open(i.method,i.url,!0),"include"===i.credentials&&(u.withCredentials=!0),"responseType"in u&&d.blob&&(u.responseType="blob"),i.headers.forEach(function(t,n){u.setRequestHeader(n,t)}),u.send("undefined"==typeof i._bodyInit?null:i._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:void 0);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};!function(t){var n=[],e={},r="routie",o=t[r],i=function(t,n){this.name=n,this.path=t,this.keys=[],this.fns=[],this.params={},this.regex=u(this.path,this.keys,!1,!1)};i.prototype.addHandler=function(t){this.fns.push(t)},i.prototype.removeHandler=function(t){for(var n=0,e=this.fns.length;e>n;n++){var r=this.fns[n];if(t==r)return void this.fns.splice(n,1)}},i.prototype.run=function(t){for(var n=0,e=this.fns.length;e>n;n++)this.fns[n].apply(this,t)},i.prototype.match=function(t,n){var e=this.regex.exec(t);if(!e)return!1;for(var r=1,o=e.length;o>r;++r){var i=this.keys[r-1],u="string"==typeof e[r]?decodeURIComponent(e[r]):e[r];i&&(this.params[i.name]=u),n.push(u)}return!0},i.prototype.toURL=function(t){var n=this.path;for(var e in t)n=n.replace("/:"+e,"/"+t[e]);if(n=n.replace(/\/:.*\?/g,"/").replace(/\?/g,""),-1!=n.indexOf(":"))throw new Error("missing parameters for url: "+n);return n};var u=function(t,n,e,r){return t instanceof RegExp?t:(t instanceof Array&&(t="("+t.join("|")+")"),t=t.concat(r?"":"/?").replace(/\/\(/g,"(?:/").replace(/\+/g,"__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,function(t,e,r,o,i,u){return n.push({name:o,optional:!!u}),e=e||"",""+(u?"":e)+"(?:"+(u?e:"")+(r||"")+(i||r&&"([^/.]+?)"||"([^/]+?)")+")"+(u||"")}).replace(/([\/.])/g,"\\$1").replace(/__plus__/g,"(.+)").replace(/\*/g,"(.*)"),new RegExp("^"+t+"$",e?"":"i"))},a=function(t,r){var o=t.split(" "),u=2==o.length?o[0]:null;t=2==o.length?o[1]:o[0],e[t]||(e[t]=new i(t,u),n.push(e[t])),e[t].addHandler(r)},s=function d(t,n){if("function"==typeof n)a(t,n),d.reload();else if("object"==("undefined"==typeof t?"undefined":_typeof(t))){for(var e in t)a(e,t[e]);d.reload()}else"undefined"==typeof n&&d.navigate(t)};s.lookup=function(t,e){for(var r=0,o=n.length;o>r;r++){var i=n[r];if(i.name==t)return i.toURL(e)}},s.remove=function(t,n){var r=e[t];r&&r.removeHandler(n)},s.removeAll=function(){e={},n=[]},s.navigate=function(t,n){n=n||{};var e=n.silent||!1;e&&h(),setTimeout(function(){window.location.hash=t,e&&setTimeout(function(){p()},1)},1)},s.noConflict=function(){return t[r]=o,s};var f=function(){return window.location.hash.substring(1)},c=function(t,n){var e=[];return n.match(t,e)?(n.run(e),!0):!1},l=s.reload=function(){for(var t=f(),e=0,r=n.length;r>e;e++){var o=n[e];if(c(t,o))return}},p=function(){t.addEventListener?t.addEventListener("hashchange",l,!1):t.attachEvent("onhashchange",l)},h=function(){t.removeEventListener?t.removeEventListener("hashchange",l):t.detachEvent("onhashchange",l)};p(),t[r]=s}(window);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};!function(t,n){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&exports&&"string"!=typeof exports.nodeName?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):(t.Mustache={},n(t.Mustache))}(window,function(t){function n(t){return"function"==typeof t}function e(t){return y(t)?"array":"undefined"==typeof t?"undefined":_typeof(t)}function r(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(t,n){return null!=t&&"object"===("undefined"==typeof t?"undefined":_typeof(t))&&n in t}function i(t,n){return v.call(t,n)}function u(t){return!i(m,t)}function a(t){return String(t).replace(/[&<>"'`=\/]/g,function(t){return g[t]})}function s(n,e){function o(){if(m&&!g)for(;v.length;)delete d[v.pop()];else v=[];m=!1,g=!1}function i(t){if("string"==typeof t&&(t=t.split(w,2)),!y(t)||2!==t.length)throw new Error("Invalid tags: "+t);a=new RegExp(r(t[0])+"\\s*"),s=new RegExp("\\s*"+r(t[1])),p=new RegExp("\\s*"+r("}"+t[1]))}if(!n)return[];var a,s,p,h=[],d=[],v=[],m=!1,g=!1;i(e||t.tags);for(var j,k,T,A,O,S,R=new l(n);!R.eos();){if(j=R.pos,T=R.scanUntil(a))for(var B=0,F=T.length;F>B;++B)A=T.charAt(B),u(A)?v.push(d.length):g=!0,d.push(["text",A,j,j+1]),j+=1,"\n"===A&&o();if(!R.scan(a))break;if(m=!0,k=R.scan(E)||"name",R.scan(b),"="===k?(T=R.scanUntil(x),R.scan(x),R.scanUntil(s)):"{"===k?(T=R.scanUntil(p),R.scan(_),R.scanUntil(s),k="&"):T=R.scanUntil(s),!R.scan(s))throw new Error("Unclosed tag at "+R.pos);if(O=[k,T,j,R.pos],d.push(O),"#"===k||"^"===k)h.push(O);else if("/"===k){if(S=h.pop(),!S)throw new Error('Unopened section "'+T+'" at '+j);if(S[1]!==T)throw new Error('Unclosed section "'+S[1]+'" at '+j)}else"name"===k||"{"===k||"&"===k?g=!0:"="===k&&i(T)}if(S=h.pop())throw new Error('Unclosed section "'+S[1]+'" at '+R.pos);return c(f(d))}function f(t){for(var n,e,r=[],o=0,i=t.length;i>o;++o)n=t[o],n&&("text"===n[0]&&e&&"text"===e[0]?(e[1]+=n[1],e[3]=n[3]):(r.push(n),e=n));return r}function c(t){for(var n,e,r=[],o=r,i=[],u=0,a=t.length;a>u;++u)switch(n=t[u],n[0]){case"#":case"^":o.push(n),i.push(n),o=n[4]=[];break;case"/":e=i.pop(),e[5]=n[2],o=i.length>0?i[i.length-1][4]:r;break;default:o.push(n)}return r}function l(t){this.string=t,this.tail=t,this.pos=0}function p(t,n){this.view=t,this.cache={".":this.view},this.parent=n}function h(){this.cache={}}var d=Object.prototype.toString,y=Array.isArray||function(t){return"[object Array]"===d.call(t)},v=RegExp.prototype.test,m=/\S/,g={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},b=/\s*/,w=/\s+/,x=/\s*=/,_=/\s*\}/,E=/#|\^|\/|>|\{|&|=|!/;l.prototype.eos=function(){return""===this.tail},l.prototype.scan=function(t){var n=this.tail.match(t);if(!n||0!==n.index)return"";var e=n[0];return this.tail=this.tail.substring(e.length),this.pos+=e.length,e},l.prototype.scanUntil=function(t){var n,e=this.tail.search(t);switch(e){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,e),this.tail=this.tail.substring(e)}return this.pos+=n.length,n},p.prototype.push=function(t){return new p(t,this)},p.prototype.lookup=function(t){var e,r=this.cache;if(r.hasOwnProperty(t))e=r[t];else{for(var i,u,a=this,s=!1;a;){if(t.indexOf(".")>0)for(e=a.view,i=t.split("."),u=0;null!=e&&u<i.length;)u===i.length-1&&(s=o(e,i[u])),e=e[i[u++]];else e=a.view[t],s=o(a.view,t);if(s)break;a=a.parent}r[t]=e}return n(e)&&(e=e.call(this.view)),e},h.prototype.clearCache=function(){this.cache={}},h.prototype.parse=function(t,n){var e=this.cache,r=e[t];return null==r&&(r=e[t]=s(t,n)),r},h.prototype.render=function(t,n,e){var r=this.parse(t),o=n instanceof p?n:new p(n);return this.renderTokens(r,o,e,t)},h.prototype.renderTokens=function(t,n,e,r){for(var o,i,u,a="",s=0,f=t.length;f>s;++s)u=void 0,o=t[s],i=o[0],"#"===i?u=this.renderSection(o,n,e,r):"^"===i?u=this.renderInverted(o,n,e,r):">"===i?u=this.renderPartial(o,n,e,r):"&"===i?u=this.unescapedValue(o,n):"name"===i?u=this.escapedValue(o,n):"text"===i&&(u=this.rawValue(o)),void 0!==u&&(a+=u);return a},h.prototype.renderSection=function(t,e,r,o){function i(t){return u.render(t,e,r)}var u=this,a="",s=e.lookup(t[1]);if(s){if(y(s))for(var f=0,c=s.length;c>f;++f)a+=this.renderTokens(t[4],e.push(s[f]),r,o);else if("object"===("undefined"==typeof s?"undefined":_typeof(s))||"string"==typeof s||"number"==typeof s)a+=this.renderTokens(t[4],e.push(s),r,o);else if(n(s)){if("string"!=typeof o)throw new Error("Cannot use higher-order sections without the original template");s=s.call(e.view,o.slice(t[3],t[5]),i),null!=s&&(a+=s)}else a+=this.renderTokens(t[4],e,r,o);return a}},h.prototype.renderInverted=function(t,n,e,r){var o=n.lookup(t[1]);return!o||y(o)&&0===o.length?this.renderTokens(t[4],n,e,r):void 0},h.prototype.renderPartial=function(t,e,r){if(r){var o=n(r)?r(t[1]):r[t[1]];return null!=o?this.renderTokens(this.parse(o),e,r,o):void 0}},h.prototype.unescapedValue=function(t,n){var e=n.lookup(t[1]);return null!=e?e:void 0},h.prototype.escapedValue=function(n,e){var r=e.lookup(n[1]);return null!=r?t.escape(r):void 0},h.prototype.rawValue=function(t){return t[1]},t.name="mustache.js",t.version="2.2.1",t.tags=["{{","}}"];var j=new h;t.clearCache=function(){return j.clearCache()},t.parse=function(t,n){return j.parse(t,n)},t.render=function(t,n,r){if("string"!=typeof t)throw new TypeError('Invalid template! Template should be a "string" but "'+e(t)+'" was given as the first argument for mustache#render(template, view, partials)');return j.render(t,n,r)},t.to_html=function(e,r,o,i){var u=t.render(e,r,o);return n(i)?void i(u):u},t.escape=a,t.Scanner=l,t.Context=p,t.Writer=h});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};(function(){function t(t){function n(n,e,r,o,i,u){for(;i>=0&&u>i;i+=t){var a=o?o[i]:i;r=e(r,n[a],a,n)}return r}return function(e,r,o,i){r=b(r,i,4);var u=!T(e)&&g.keys(e),a=(u||e).length,s=t>0?0:a-1;return arguments.length<3&&(o=e[u?u[s]:s],s+=t),n(e,r,o,u,s,a)}}function n(t){return function(n,e,r){e=w(e,r);for(var o=k(n),i=t>0?0:o-1;i>=0&&o>i;i+=t)if(e(n[i],i,n))return i;return-1}}function e(t,n,e){return function(r,o,i){var u=0,a=k(r);if("number"==typeof i)t>0?u=i>=0?i:Math.max(i+a,u):a=i>=0?Math.min(i+1,a):i+a+1;else if(e&&i&&a)return i=e(r,o),r[i]===o?i:-1;if(o!==o)return i=n(c.call(r,u,a),g.isNaN),i>=0?i+u:-1;for(i=t>0?u:a-1;i>=0&&a>i;i+=t)if(r[i]===o)return i;return-1}}function r(t,n){var e=B.length,r=t.constructor,o=g.isFunction(r)&&r.prototype||a,i="constructor";for(g.has(t,i)&&!g.contains(n,i)&&n.push(i);e--;)i=B[e],i in t&&t[i]!==o[i]&&!g.contains(n,i)&&n.push(i)}var o=window,i=o._,u=Array.prototype,a=Object.prototype,s=Function.prototype,f=u.push,c=u.slice,l=a.toString,p=a.hasOwnProperty,h=Array.isArray,d=Object.keys,y=s.bind,v=Object.create,m=function(){},g=function H(t){return t instanceof H?t:this instanceof H?void(this._wrapped=t):new H(t)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=g),exports._=g):o._=g,g.VERSION="1.8.3";var b=function(t,n,e){if(void 0===n)return t;switch(null==e?3:e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)};case 4:return function(e,r,o,i){return t.call(n,e,r,o,i)}}return function(){return t.apply(n,arguments)}},w=function(t,n,e){return null==t?g.identity:g.isFunction(t)?b(t,n,e):g.isObject(t)?g.matcher(t):g.property(t)};g.iteratee=function(t,n){return w(t,n,1/0)};var x=function(t,n){return function(e){var r=arguments.length;if(2>r||null==e)return e;for(var o=1;r>o;o++)for(var i=arguments[o],u=t(i),a=u.length,s=0;a>s;s++){var f=u[s];n&&void 0!==e[f]||(e[f]=i[f])}return e}},_=function(t){if(!g.isObject(t))return{};if(v)return v(t);m.prototype=t;var n=new m;return m.prototype=null,n},E=function(t){return function(n){return null==n?void 0:n[t]}},j=Math.pow(2,53)-1,k=E("length"),T=function(t){var n=k(t);return"number"==typeof n&&n>=0&&j>=n};g.each=g.forEach=function(t,n,e){n=b(n,e);var r,o;if(T(t))for(r=0,o=t.length;o>r;r++)n(t[r],r,t);else{var i=g.keys(t);for(r=0,o=i.length;o>r;r++)n(t[i[r]],i[r],t)}return t},g.map=g.collect=function(t,n,e){n=w(n,e);for(var r=!T(t)&&g.keys(t),o=(r||t).length,i=Array(o),u=0;o>u;u++){var a=r?r[u]:u;i[u]=n(t[a],a,t)}return i},g.reduce=g.foldl=g.inject=t(1),g.reduceRight=g.foldr=t(-1),g.find=g.detect=function(t,n,e){var r;return r=T(t)?g.findIndex(t,n,e):g.findKey(t,n,e),void 0!==r&&-1!==r?t[r]:void 0},g.filter=g.select=function(t,n,e){var r=[];return n=w(n,e),g.each(t,function(t,e,o){n(t,e,o)&&r.push(t)}),r},g.reject=function(t,n,e){return g.filter(t,g.negate(w(n)),e)},g.every=g.all=function(t,n,e){n=w(n,e);for(var r=!T(t)&&g.keys(t),o=(r||t).length,i=0;o>i;i++){var u=r?r[i]:i;if(!n(t[u],u,t))return!1}return!0},g.some=g.any=function(t,n,e){n=w(n,e);for(var r=!T(t)&&g.keys(t),o=(r||t).length,i=0;o>i;i++){var u=r?r[i]:i;if(n(t[u],u,t))return!0}return!1},g.contains=g.includes=g.include=function(t,n,e,r){return T(t)||(t=g.values(t)),("number"!=typeof e||r)&&(e=0),g.indexOf(t,n,e)>=0},g.invoke=function(t,n){var e=c.call(arguments,2),r=g.isFunction(n);return g.map(t,function(t){var o=r?n:t[n];return null==o?o:o.apply(t,e)})},g.pluck=function(t,n){return g.map(t,g.property(n))},g.where=function(t,n){return g.filter(t,g.matcher(n))},g.findWhere=function(t,n){return g.find(t,g.matcher(n))},g.max=function(t,n,e){var r,o,i=-(1/0),u=-(1/0);if(null==n&&null!=t){t=T(t)?t:g.values(t);for(var a=0,s=t.length;s>a;a++)r=t[a],r>i&&(i=r)}else n=w(n,e),g.each(t,function(t,e,r){o=n(t,e,r),(o>u||o===-(1/0)&&i===-(1/0))&&(i=t,u=o)});return i},g.min=function(t,n,e){var r,o,i=1/0,u=1/0;if(null==n&&null!=t){t=T(t)?t:g.values(t);for(var a=0,s=t.length;s>a;a++)r=t[a],i>r&&(i=r)}else n=w(n,e),g.each(t,function(t,e,r){o=n(t,e,r),(u>o||o===1/0&&i===1/0)&&(i=t,u=o)});return i},g.shuffle=function(t){for(var n,e=T(t)?t:g.values(t),r=e.length,o=Array(r),i=0;r>i;i++)n=g.random(0,i),n!==i&&(o[i]=o[n]),o[n]=e[i];return o},g.sample=function(t,n,e){return null==n||e?(T(t)||(t=g.values(t)),t[g.random(t.length-1)]):g.shuffle(t).slice(0,Math.max(0,n))},g.sortBy=function(t,n,e){return n=w(n,e),g.pluck(g.map(t,function(t,e,r){return{value:t,index:e,criteria:n(t,e,r)}}).sort(function(t,n){var e=t.criteria,r=n.criteria;if(e!==r){if(e>r||void 0===e)return 1;if(r>e||void 0===r)return-1}return t.index-n.index}),"value")};var A=function(t){return function(n,e,r){var o={};return e=w(e,r),g.each(n,function(r,i){var u=e(r,i,n);t(o,r,u)}),o}};g.groupBy=A(function(t,n,e){g.has(t,e)?t[e].push(n):t[e]=[n]}),g.indexBy=A(function(t,n,e){t[e]=n}),g.countBy=A(function(t,n,e){g.has(t,e)?t[e]++:t[e]=1}),g.toArray=function(t){return t?g.isArray(t)?c.call(t):T(t)?g.map(t,g.identity):g.values(t):[]},g.size=function(t){return null==t?0:T(t)?t.length:g.keys(t).length},g.partition=function(t,n,e){n=w(n,e);var r=[],o=[];return g.each(t,function(t,e,i){(n(t,e,i)?r:o).push(t)}),[r,o]},g.first=g.head=g.take=function(t,n,e){return null!=t?null==n||e?t[0]:g.initial(t,t.length-n):void 0},g.initial=function(t,n,e){return c.call(t,0,Math.max(0,t.length-(null==n||e?1:n)))},g.last=function(t,n,e){return null!=t?null==n||e?t[t.length-1]:g.rest(t,Math.max(0,t.length-n)):void 0},g.rest=g.tail=g.drop=function(t,n,e){return c.call(t,null==n||e?1:n)},g.compact=function(t){return g.filter(t,g.identity)};var O=function V(t,n,e,r){for(var o=[],i=0,u=r||0,a=k(t);a>u;u++){var s=t[u];if(T(s)&&(g.isArray(s)||g.isArguments(s))){n||(s=V(s,n,e));var f=0,c=s.length;for(o.length+=c;c>f;)o[i++]=s[f++]}else e||(o[i++]=s)}return o};g.flatten=function(t,n){return O(t,n,!1)},g.without=function(t){return g.difference(t,c.call(arguments,1))},g.uniq=g.unique=function(t,n,e,r){g.isBoolean(n)||(r=e,e=n,n=!1),null!=e&&(e=w(e,r));for(var o=[],i=[],u=0,a=k(t);a>u;u++){var s=t[u],f=e?e(s,u,t):s;n?(u&&i===f||o.push(s),i=f):e?g.contains(i,f)||(i.push(f),o.push(s)):g.contains(o,s)||o.push(s)}return o},g.union=function(){return g.uniq(O(arguments,!0,!0))},g.intersection=function(t){for(var n=[],e=arguments.length,r=0,o=k(t);o>r;r++){var i=t[r];if(!g.contains(n,i)){for(var u=1;e>u&&g.contains(arguments[u],i);u++);u===e&&n.push(i)}}return n},g.difference=function(t){var n=O(arguments,!0,!0,1);return g.filter(t,function(t){return!g.contains(n,t)})},g.zip=function(){return g.unzip(arguments)},g.unzip=function(t){for(var n=t&&g.max(t,k).length||0,e=Array(n),r=0;n>r;r++)e[r]=g.pluck(t,r);return e},g.object=function(t,n){for(var e={},r=0,o=k(t);o>r;r++)n?e[t[r]]=n[r]:e[t[r][0]]=t[r][1];return e},g.findIndex=n(1),g.findLastIndex=n(-1),g.sortedIndex=function(t,n,e,r){e=w(e,r,1);for(var o=e(n),i=0,u=k(t);u>i;){var a=Math.floor((i+u)/2);e(t[a])<o?i=a+1:u=a}return i},g.indexOf=e(1,g.findIndex,g.sortedIndex),g.lastIndexOf=e(-1,g.findLastIndex),g.range=function(t,n,e){null==n&&(n=t||0,t=0),e=e||1;for(var r=Math.max(Math.ceil((n-t)/e),0),o=Array(r),i=0;r>i;i++,t+=e)o[i]=t;return o};var S=function(t,n,e,r,o){if(!(r instanceof n))return t.apply(e,o);var i=_(t.prototype),u=t.apply(i,o);return g.isObject(u)?u:i};g.bind=function(t,n){if(y&&t.bind===y)return y.apply(t,c.call(arguments,1));if(!g.isFunction(t))throw new TypeError("Bind must be called on a function");var e=c.call(arguments,2),r=function o(){return S(t,o,n,this,e.concat(c.call(arguments)))};return r},g.partial=function(t){var n=c.call(arguments,1),e=function r(){for(var e=0,o=n.length,i=Array(o),u=0;o>u;u++)i[u]=n[u]===g?arguments[e++]:n[u];for(;e<arguments.length;)i.push(arguments[e++]);return S(t,r,this,this,i)};return e},g.bindAll=function(t){var n,e,r=arguments.length;if(1>=r)throw new Error("bindAll must be passed function names");for(n=1;r>n;n++)e=arguments[n],t[e]=g.bind(t[e],t);return t},g.memoize=function(t,n){var e=function r(e){var o=r.cache,i=""+(n?n.apply(this,arguments):e);return g.has(o,i)||(o[i]=t.apply(this,arguments)),o[i]};return e.cache={},e},g.delay=function(t,n){var e=c.call(arguments,2);return setTimeout(function(){return t.apply(null,e)},n)},g.defer=g.partial(g.delay,g,1),g.throttle=function(t,n,e){var r,o,i,u=null,a=0;e||(e={});var s=function(){a=e.leading===!1?0:g.now(),u=null,i=t.apply(r,o),u||(r=o=null)};return function(){var f=g.now();a||e.leading!==!1||(a=f);var c=n-(f-a);return r=this,o=arguments,0>=c||c>n?(u&&(clearTimeout(u),u=null),a=f,i=t.apply(r,o),u||(r=o=null)):u||e.trailing===!1||(u=setTimeout(s,c)),i}},g.debounce=function(t,n,e){var r,o,i,u,a,s=function f(){var s=g.now()-u;n>s&&s>=0?r=setTimeout(f,n-s):(r=null,e||(a=t.apply(i,o),r||(i=o=null)))};return function(){i=this,o=arguments,u=g.now();var f=e&&!r;return r||(r=setTimeout(s,n)),f&&(a=t.apply(i,o),i=o=null),a}},g.wrap=function(t,n){return g.partial(n,t)},g.negate=function(t){return function(){return!t.apply(this,arguments)}},g.compose=function(){var t=arguments,n=t.length-1;return function(){for(var e=n,r=t[n].apply(this,arguments);e--;)r=t[e].call(this,r);return r}},g.after=function(t,n){return function(){return--t<1?n.apply(this,arguments):void 0}},g.before=function(t,n){var e;return function(){return--t>0&&(e=n.apply(this,arguments)),1>=t&&(n=null),e}},g.once=g.partial(g.before,2);var R=!{toString:null}.propertyIsEnumerable("toString"),B=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];g.keys=function(t){if(!g.isObject(t))return[];if(d)return d(t);var n=[];for(var e in t)g.has(t,e)&&n.push(e);return R&&r(t,n),n},g.allKeys=function(t){if(!g.isObject(t))return[];var n=[];for(var e in t)n.push(e);return R&&r(t,n),n},g.values=function(t){for(var n=g.keys(t),e=n.length,r=Array(e),o=0;e>o;o++)r[o]=t[n[o]];return r},g.mapObject=function(t,n,e){n=w(n,e);for(var r,o=g.keys(t),i=o.length,u={},a=0;i>a;a++)r=o[a],u[r]=n(t[r],r,t);return u},g.pairs=function(t){for(var n=g.keys(t),e=n.length,r=Array(e),o=0;e>o;o++)r[o]=[n[o],t[n[o]]];return r},g.invert=function(t){for(var n={},e=g.keys(t),r=0,o=e.length;o>r;r++)n[t[e[r]]]=e[r];return n},g.functions=g.methods=function(t){var n=[];for(var e in t)g.isFunction(t[e])&&n.push(e);return n.sort()},g.extend=x(g.allKeys),g.extendOwn=g.assign=x(g.keys),g.findKey=function(t,n,e){n=w(n,e);for(var r,o=g.keys(t),i=0,u=o.length;u>i;i++)if(r=o[i],n(t[r],r,t))return r},g.pick=function(t,n,e){var r,o,i={},u=t;if(null==u)return i;g.isFunction(n)?(o=g.allKeys(u),r=b(n,e)):(o=O(arguments,!1,!1,1),r=function(t,n,e){return n in e},u=Object(u));for(var a=0,s=o.length;s>a;a++){var f=o[a],c=u[f];r(c,f,u)&&(i[f]=c)}return i},g.omit=function(t,n,e){if(g.isFunction(n))n=g.negate(n);else{var r=g.map(O(arguments,!1,!1,1),String);n=function(t,n){return!g.contains(r,n)}}return g.pick(t,n,e)},g.defaults=x(g.allKeys,!0),g.create=function(t,n){var e=_(t);return n&&g.extendOwn(e,n),e},g.clone=function(t){return g.isObject(t)?g.isArray(t)?t.slice():g.extend({},t):t},g.tap=function(t,n){return n(t),t},g.isMatch=function(t,n){var e=g.keys(n),r=e.length;if(null==t)return!r;for(var o=Object(t),i=0;r>i;i++){var u=e[i];if(n[u]!==o[u]||!(u in o))return!1}return!0};var F=function z(t,n,e,r){if(t===n)return 0!==t||1/t===1/n;if(null==t||null==n)return t===n;t instanceof g&&(t=t._wrapped),n instanceof g&&(n=n._wrapped);var o=l.call(t);if(o!==l.call(n))return!1;switch(o){case"[object RegExp]":case"[object String]":return""+t==""+n;case"[object Number]":return+t!==+t?+n!==+n:0===+t?1/+t===1/n:+t===+n;case"[object Date]":case"[object Boolean]":return+t===+n}var i="[object Array]"===o;if(!i){if("object"!=("undefined"==typeof t?"undefined":_typeof(t))||"object"!=("undefined"==typeof n?"undefined":_typeof(n)))return!1;var u=t.constructor,a=n.constructor;if(u!==a&&!(g.isFunction(u)&&u instanceof u&&g.isFunction(a)&&a instanceof a)&&"constructor"in t&&"constructor"in n)return!1}e=e||[],r=r||[];for(var s=e.length;s--;)if(e[s]===t)return r[s]===n;if(e.push(t),r.push(n),i){if(s=t.length,s!==n.length)return!1;for(;s--;)if(!z(t[s],n[s],e,r))return!1}else{var f,c=g.keys(t);if(s=c.length,g.keys(n).length!==s)return!1;for(;s--;)if(f=c[s],!g.has(n,f)||!z(t[f],n[f],e,r))return!1}return e.pop(),r.pop(),!0};g.isEqual=function(t,n){return F(t,n)},g.isEmpty=function(t){return null==t?!0:T(t)&&(g.isArray(t)||g.isString(t)||g.isArguments(t))?0===t.length:0===g.keys(t).length},g.isElement=function(t){return!(!t||1!==t.nodeType)},g.isArray=h||function(t){return"[object Array]"===l.call(t)},g.isObject=function(t){var n="undefined"==typeof t?"undefined":_typeof(t);return"function"===n||"object"===n&&!!t},g.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(t){g["is"+t]=function(n){return l.call(n)==="[object "+t+"]"}}),g.isArguments(arguments)||(g.isArguments=function(t){return g.has(t,"callee")}),"function"!=typeof/./&&"object"!=("undefined"==typeof Int8Array?"undefined":_typeof(Int8Array))&&(g.isFunction=function(t){return"function"==typeof t||!1}),g.isFinite=function(t){return isFinite(t)&&!isNaN(parseFloat(t))},g.isNaN=function(t){return g.isNumber(t)&&t!==+t},g.isBoolean=function(t){return t===!0||t===!1||"[object Boolean]"===l.call(t)},g.isNull=function(t){return null===t},g.isUndefined=function(t){return void 0===t},g.has=function(t,n){return null!=t&&p.call(t,n)},g.noConflict=function(){return o._=i,this},g.identity=function(t){return t},g.constant=function(t){return function(){return t}},g.noop=function(){},g.property=E,g.propertyOf=function(t){return null==t?function(){}:function(n){return t[n]}},g.matcher=g.matches=function(t){return t=g.extendOwn({},t),function(n){return g.isMatch(n,t)}},g.times=function(t,n,e){var r=Array(Math.max(0,t));n=b(n,e,1);for(var o=0;t>o;o++)r[o]=n(o);return r},g.random=function(t,n){return null==n&&(n=t,t=0),t+Math.floor(Math.random()*(n-t+1))},g.now=Date.now||function(){return(new Date).getTime()};var I={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},U=g.invert(I),P=function(t){var n=function(n){return t[n]},e="(?:"+g.keys(t).join("|")+")",r=RegExp(e),o=RegExp(e,"g");return function(t){return t=null==t?"":""+t,r.test(t)?t.replace(o,n):t}};g.escape=P(I),g.unescape=P(U),g.result=function(t,n,e){var r=null==t?void 0:t[n];return void 0===r&&(r=e),g.isFunction(r)?r.call(t):r};var D=0;g.uniqueId=function(t){var n=++D+"";return t?t+n:n},g.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var N=/(.)^/,M={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},L=/\\|'|\r|\n|\u2028|\u2029/g,q=function(t){return"\\"+M[t]};g.template=function(t,n,e){!n&&e&&(n=e),n=g.defaults({},n,g.templateSettings);var r=RegExp([(n.escape||N).source,(n.interpolate||N).source,(n.evaluate||N).source].join("|")+"|$","g"),o=0,i="__p+='";t.replace(r,function(n,e,r,u,a){return i+=t.slice(o,a).replace(L,q),o=a+n.length,e?i+="'+\n((__t=("+e+"))==null?'':_.escape(__t))+\n'":r?i+="'+\n((__t=("+r+"))==null?'':__t)+\n'":u&&(i+="';\n"+u+"\n__p+='"),n}),i+="';\n",n.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var u=new Function(n.variable||"obj","_",i)}catch(a){throw a.source=i,a}var s=function(t){return u.call(this,t,g)},f=n.variable||"obj";return s.source="function("+f+"){\n"+i+"}",s},g.chain=function(t){var n=g(t);return n._chain=!0,n};var C=function(t,n){return t._chain?g(n).chain():n};g.mixin=function(t){g.each(g.functions(t),function(n){var e=g[n]=t[n];g.prototype[n]=function(){var t=[this._wrapped];return f.apply(t,arguments),C(this,e.apply(g,t))}})},g.mixin(g),g.each(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var n=u[t];g.prototype[t]=function(){var e=this._wrapped;return n.apply(e,arguments),"shift"!==t&&"splice"!==t||0!==e.length||delete e[0],C(this,e)}}),g.each(["concat","join","slice"],function(t){var n=u[t];g.prototype[t]=function(){return C(this,n.apply(this._wrapped,arguments))}}),g.prototype.value=function(){return this._wrapped},g.prototype.valueOf=g.prototype.toJSON=g.prototype.value,g.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return g})}).call(void 0);