"use strict";

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart

String.prototype.padStart || (String.prototype.padStart = function (t, i) {
  return t >>= 0, i = String(void 0 !== i ? i : " "), this.length > t ? String(this) : ((t -= this.length) > i.length && (i += i.repeat(t / i.length)), i.slice(0, t) + String(this));
});
//# sourceMappingURL=polyfills.min.js.map
//# sourceMappingURL=polyfills.min.js.map
//# sourceMappingURL=polyfills.min.js.map
//# sourceMappingURL=polyfills.min.js.map
//# sourceMappingURL=polyfills.min.js.map
//# sourceMappingURL=polyfills.min.js.map
//# sourceMappingURL=polyfills.min.js.map