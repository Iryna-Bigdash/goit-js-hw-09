!function(){var t=null,n={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),bodyEl:document.querySelector("body")};n.startBtn.addEventListener("click",(function(e){if(t=setInterval((function(){n.bodyEl.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),n.startBtn)return n.startBtn.disabled=!0})),n.stopBtn.addEventListener("click",(function(e){if(clearInterval(t),n.stopBtn)return n.startBtn.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.bb1088e3.js.map
