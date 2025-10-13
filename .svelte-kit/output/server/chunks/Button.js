import { Z as fallback, a2 as attr, a3 as attr_class, a6 as slot, $ as bind_props, a4 as stringify } from "./index2.js";
import { h as html } from "./Button.svelte_svelte_type_style_lang.js";
function Button($$renderer, $$props) {
  let variant = fallback($$props["variant"], "primary");
  let size = fallback($$props["size"], "medium");
  let type = fallback($$props["type"], "button");
  let href = fallback($$props["href"], void 0);
  let disabled = fallback($$props["disabled"], false);
  let loading = fallback($$props["loading"], false);
  let fullWidth = fallback($$props["fullWidth"], false);
  let icon = fallback($$props["icon"], void 0);
  if (href && !disabled) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<a${attr("href", href)}${attr_class(`btn btn--${stringify(variant)} btn--${stringify(size)}`, "svelte-18sv61c", { "btn--full": fullWidth, "btn--loading": loading })}>`);
    if (loading) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<span class="btn-spinner svelte-18sv61c"></span>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]--> `);
    if (icon && !loading) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<span class="btn-icon svelte-18sv61c">${html(icon)}</span>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]--> <span class="btn-text svelte-18sv61c"><!--[-->`);
    slot($$renderer, $$props, "default", {}, null);
    $$renderer.push(`<!--]--></span></a>`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<button${attr("type", type)}${attr("disabled", disabled, true)}${attr_class(`btn btn--${stringify(variant)} btn--${stringify(size)}`, "svelte-18sv61c", { "btn--full": fullWidth, "btn--loading": loading })}>`);
    if (loading) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<span class="btn-spinner svelte-18sv61c"></span>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]--> `);
    if (icon && !loading) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<span class="btn-icon svelte-18sv61c">${html(icon)}</span>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]--> <span class="btn-text svelte-18sv61c"><!--[-->`);
    slot($$renderer, $$props, "default", {}, null);
    $$renderer.push(`<!--]--></span></button>`);
  }
  $$renderer.push(`<!--]-->`);
  bind_props($$props, {
    variant,
    size,
    type,
    href,
    disabled,
    loading,
    fullWidth,
    icon
  });
}
export {
  Button as B
};
