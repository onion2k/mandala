export default class Seeder {
  constructor(el, callback) {
    let seed = el.value;
    el.addEventListener("keyup", callback);
    return this;
  }
}
