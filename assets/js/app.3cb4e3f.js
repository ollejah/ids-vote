(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"../node_modules/offline-plugin/runtime.js":function(e,t){function n(){return"serviceWorker"in navigator&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}t.install=function(e){e||(e={}),n()&&navigator.serviceWorker.register("service-worker.js",{})},t.applyUpdate=function(e,t){},t.update=function(){n()&&navigator.serviceWorker.getRegistration().then(function(e){if(e)return e.update()})}},"../node_modules/webpack/buildin/harmony-module.js":function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},"./app.js":function(e,t,n){"use strict";n.r(t),function(e){n("./styles/app.scss"),n("./scripts/service-worker.js");e.hot&&e.hot.accept();window.qs=document.querySelector.bind(document),window.qsa=document.querySelectorAll.bind(document),Element.prototype.on=Element.prototype.addEventListener,Element.prototype.off=Element.prototype.removeEventListener;var t=qs("html"),o=qs(".js-loader"),r=qs(".js-update"),i=qs(".js-results");qs('a[href="#vote"]').on("click",function(e){e.preventDefault(),s()}),qs('a[href="#update"]').on("click",function(e){e.preventDefault(),a()});var s=function(){fetch("https://ollejah.ru:3000/vote",{method:"POST"}).then(function(e){return 200===e.status&&e.text()}).then(function(e){return a()}).catch(function(e){})},a=function(){t.classList.add("is-loading"),r.classList.add("is-rotate"),o.classList.remove("hidden"),fetch("https://ollejah.ru:3000/result",{method:"POST"}).then(function(e){return 200===e.status&&e.text()}).then(function(e){return c(e)}).catch(function(e){})},c=function(e){i.innerHTML=e;var n=Array.from(qsa(".js-results .rline")),s=n.map(function(e){return e.querySelector(".ocount").innerText}),a=Math.max.apply(Math,function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(s)),c=n.map(function(e){var t=e.querySelector("span").innerText.split(" / "),n=e.querySelector(".ocount").innerText,o=Math.round(n/a*100);return'\n      <article class="rline" data-rate="'+n+'">\n        <header>\n          <h4>'+t[0]+"</h4> \n          <small>"+t[1]+"</small>\n        </header>\n        <big>"+n+'</big>\n        <span class="rline-bar" style="width:'+o+'%"></span>\n      </article>'});i.innerHTML=c.join(""),i.removeAttribute("hidden"),t.classList.remove("is-loading"),r.classList.remove("is-rotate"),o.classList.add("hidden")};document.addEventListener("readystatechange",function(){if("interactive"===document.readyState&&(t.classList.remove("is-loading"),a()),"complete"===document.readyState)setInterval(function(){return a()},6e5)})}.call(this,n("../node_modules/webpack/buildin/harmony-module.js")(e))},"./scripts/service-worker.js":function(e,t,n){"use strict";var o=n("../node_modules/offline-plugin/runtime.js");o.install({onUpdating:function(){},onUpdateReady:function(){o.applyUpdate()},onUpdated:function(){window.location.reload()},onUpdateFailed:function(){}});var r=document.querySelector(".js-offline-ready");function i(){navigator.onLine?r.classList.remove("is-active"):r.classList.add("is-active")}window.addEventListener("offline",i),window.addEventListener("online",i),!navigator.onLine&&setTimeout(function(){return i()},300),r.addEventListener("click",function(e){return r.classList.remove("is-active")})},"./styles/app.scss":function(e,t,n){},1:function(e,t,n){n("./styles/app.scss"),e.exports=n("./app.js")}},[[1,0]]]);
//# sourceMappingURL=app.3cb4e3f.js.map