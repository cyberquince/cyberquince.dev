const META_ATTRIBUTE = 'vm-meta';

export default class VueMeta {
  static setMeta({ title, meta = [] }) {
    if (title) {
      document.title = title;
    }

    document.querySelectorAll(`meta[${META_ATTRIBUTE}]`)
      .forEach((el) => el.remove());

    meta.forEach((def) => {
      const tag = document.createElement('meta');
      Object.entries(def).forEach(([key, value]) => {
        tag.setAttribute(key, value);
      });
      // tag.setAttribute(META_ATTRIBUTE, 'true');
      document.head.appendChild(tag);
    });
  }
}
