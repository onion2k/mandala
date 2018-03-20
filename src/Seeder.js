import debounce from "debounce";

export default class Seeder {
  constructor(el, callback) {
    this.callback = callback;
    this.caller = this.call.bind(this);
    el.addEventListener("keyup", debounce(this.caller, 250));
    return this;
  }
  add(el, ev) {
    el.addEventListener(ev, debounce(this.caller, 250));
  }
  call(e) {
    let c;
    let value = e.target.value;
    if (value) {
      c = value.charCodeAt(0) || Math.floor(Math.random() * 256);
    } else {
      c = Math.floor(Math.random() * 256);
    }
    this.callback(c);
  }
}
