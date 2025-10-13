import { Z as fallback, a2 as attr, a3 as attr_class, a9 as attr_style, _ as escape_html, $ as bind_props, a4 as stringify } from "./index2.js";
function ServiceCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let icon = fallback($$props["icon"], "");
    let title = fallback($$props["title"], "");
    let description = fallback($$props["description"], "");
    let buttonText = fallback($$props["buttonText"], "Learn More →");
    let buttonHref = fallback($$props["buttonHref"], "#");
    let backgroundImage = fallback($$props["backgroundImage"], "");
    let logoClass = "";
    if (icon.includes("bmw")) logoClass = "logo-bmw";
    else if (icon.includes("landrover") || icon.includes("range-rover")) logoClass = "logo-landrover";
    else if (icon.includes("data:image")) logoClass = "logo-insurance";
    $$renderer2.push(`<a${attr("href", buttonHref)}${attr_class("service-card svelte-j3latp", void 0, { "has-background": backgroundImage })}${attr_style(backgroundImage ? `background-image: url('${backgroundImage}')` : "")}>`);
    if (backgroundImage) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="service-overlay svelte-j3latp"></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="service-content svelte-j3latp">`);
    if (icon) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", icon)}${attr("alt", title)}${attr_class(`service-icon ${stringify(logoClass)}`, "svelte-j3latp")}/>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<h3 class="service-title svelte-j3latp">${escape_html(title)}</h3>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (description) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="service-description svelte-j3latp">${escape_html(description)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (buttonText) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="service-link svelte-j3latp">${escape_html(buttonText)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></a>`);
    bind_props($$props, {
      icon,
      title,
      description,
      buttonText,
      buttonHref,
      backgroundImage
    });
  });
}
export {
  ServiceCard as S
};
