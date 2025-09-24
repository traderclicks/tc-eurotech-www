import { Z as fallback, a2 as attr, $ as escape_html, _ as bind_props, a1 as ensure_array_like, a7 as attr_class, a3 as stringify, ac as attr_style } from "./index2.js";
import { h as html, B as Button } from "./Button.js";
function FeatureCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isSvgString, isImageUrl;
    let icon = fallback($$props["icon"], "✨");
    let title = fallback($$props["title"], "");
    let description = fallback($$props["description"], "");
    isSvgString = typeof icon === "string" && icon.includes("<svg");
    isImageUrl = typeof icon === "string" && (icon.startsWith("/") || icon.startsWith("http") || icon.startsWith("data:"));
    $$renderer2.push(`<div class="feature-card svelte-1tvhds4"><div class="feature-icon svelte-1tvhds4">`);
    if (isSvgString) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`${html(icon)}`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (isImageUrl) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<img${attr("src", icon)}${attr("alt", title)} class="svelte-1tvhds4"/>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`${escape_html(icon)}`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> <h3 class="feature-title svelte-1tvhds4">${escape_html(title)}</h3> <p class="feature-description svelte-1tvhds4">${escape_html(description)}</p></div>`);
    bind_props($$props, { icon, title, description });
  });
}
function TestimonialCard($$renderer, $$props) {
  let name = fallback($$props["name"], "");
  let role = fallback($$props["role"], "");
  let content = fallback($$props["content"], "");
  let avatar = fallback($$props["avatar"], "");
  $$renderer.push(`<div class="testimonial svelte-1wv70ah"><div class="testimonial-content svelte-1wv70ah"><p>"${escape_html(content)}"</p></div> <div class="testimonial-author svelte-1wv70ah">`);
  if (avatar) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<img${attr("src", avatar)}${attr("alt", name)} class="author-avatar svelte-1wv70ah"/>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <div><div class="author-name svelte-1wv70ah">${escape_html(name)}</div> <div class="author-role svelte-1wv70ah">${escape_html(role)}</div></div></div></div>`);
  bind_props($$props, { name, role, content, avatar });
}
function FAQ($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let items = fallback($$props["items"], () => [], true);
    let allowMultiple = fallback($$props["allowMultiple"], false);
    let openItems = /* @__PURE__ */ new Set();
    $$renderer2.push(`<div class="faq svelte-1t8i6y4"><!--[-->`);
    const each_array = ensure_array_like(items);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let item = each_array[index];
      $$renderer2.push(`<div${attr_class("faq-item svelte-1t8i6y4", void 0, { "open": openItems.has(index) })}><button class="faq-question svelte-1t8i6y4"${attr("aria-expanded", openItems.has(index))}${attr("aria-controls", `faq-answer-${stringify(index)}`)}><span class="question-text svelte-1t8i6y4">${escape_html(item.question)}</span> <span class="question-icon svelte-1t8i6y4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">`);
      if (openItems.has(index)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<line x1="5" y1="12" x2="19" y2="12"></line>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>`);
      }
      $$renderer2.push(`<!--]--></svg></span></button> `);
      if (openItems.has(index)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr("id", `faq-answer-${stringify(index)}`)} class="faq-answer svelte-1t8i6y4"><p class="svelte-1t8i6y4">${escape_html(item.answer)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { items, allowMultiple });
  });
}
function StatsGrid($$renderer, $$props) {
  let stats = fallback($$props["stats"], () => [], true);
  let backgroundColor = fallback($$props["backgroundColor"], "var(--color-primary)");
  let textColor = fallback($$props["textColor"], "white");
  $$renderer.push(`<section class="stats svelte-1p7odxv"${attr_style(`background: ${stringify(backgroundColor)}; color: ${stringify(textColor)};`)}><div class="container"><div class="stats-grid svelte-1p7odxv"><!--[-->`);
  const each_array = ensure_array_like(stats);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let stat = each_array[i];
    $$renderer.push(`<div class="stat-item"><div class="stat-number svelte-1p7odxv">${escape_html(stat.number)}</div> <div class="stat-label svelte-1p7odxv">${escape_html(stat.label)}</div></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section>`);
  bind_props($$props, { stats, backgroundColor, textColor });
}
function ServiceCard($$renderer, $$props) {
  let icon = fallback($$props["icon"], "");
  let title = fallback($$props["title"], "");
  let description = fallback($$props["description"], "");
  let buttonText = fallback($$props["buttonText"], "Learn More →");
  let buttonHref = fallback($$props["buttonHref"], "#");
  let buttonVariant = fallback($$props["buttonVariant"], "ghost");
  $$renderer.push(`<div class="service-card svelte-j3latp">`);
  if (icon) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<img${attr("src", icon)}${attr("alt", title)} class="service-icon svelte-j3latp"/>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  if (title) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<h3 class="service-title svelte-j3latp">${escape_html(title)}</h3>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  if (description) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="service-description svelte-j3latp">${escape_html(description)}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  if (buttonText && buttonHref) {
    $$renderer.push("<!--[-->");
    Button($$renderer, {
      variant: buttonVariant,
      href: buttonHref,
      children: ($$renderer2) => {
        $$renderer2.push(`<!---->${escape_html(buttonText)}`);
      },
      $$slots: { default: true }
    });
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div>`);
  bind_props($$props, {
    icon,
    title,
    description,
    buttonText,
    buttonHref,
    buttonVariant
  });
}
export {
  FeatureCard as F,
  StatsGrid as S,
  TestimonialCard as T,
  ServiceCard as a,
  FAQ as b
};
