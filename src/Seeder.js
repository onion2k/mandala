import debounce from "debounce";

export default class Seeder {
  constructor(el, callback) {
    this.callback = callback;
    let caller = this.call.bind(this);
    el.addEventListener("keyup", debounce(caller, 250));
    return this;
  }
  call(e) {
    let value = e.target.value.toLowerCase();
    let c = value.charCodeAt(0) || 0;
    this.callback(c);
  }
}
