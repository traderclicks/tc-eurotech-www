import { Z as fallback, a2 as attr, a7 as attr_class, a5 as slot, _ as bind_props, a3 as stringify } from "./index2.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
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
    slot($$renderer, $$props, "default", {});
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
    slot($$renderer, $$props, "default", {});
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
  Button as B,
  html as h
};
