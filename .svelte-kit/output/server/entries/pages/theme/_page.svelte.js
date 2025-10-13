import { Z as fallback, a2 as attr, _ as escape_html, $ as bind_props, a3 as attr_class, a4 as stringify, a1 as ensure_array_like, a6 as slot, a8 as head, ad as clsx, a5 as spread_props } from "../../../chunks/index2.js";
import "../../../chunks/modal.js";
import { B as Button } from "../../../chunks/Button.js";
import { S as ServiceCard } from "../../../chunks/ServiceCard.js";
import { h as html } from "../../../chunks/Button.svelte_svelte_type_style_lang.js";
import { F as FAQ } from "../../../chunks/FAQ.js";
import { S as StatsGrid } from "../../../chunks/StatsGrid.js";
/* empty css                                                       */
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
function Input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let type = fallback($$props["type"], "text");
    let label = fallback($$props["label"], "");
    let value = fallback($$props["value"], "");
    let placeholder = fallback($$props["placeholder"], "");
    let error = fallback($$props["error"], "");
    let required = fallback($$props["required"], false);
    let disabled = fallback($$props["disabled"], false);
    let readonly = fallback($$props["readonly"], false);
    let id = fallback($$props["id"], () => Math.random().toString(36).substring(7), true);
    $$renderer2.push(`<div class="input-group svelte-6ivx2n">`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", id)} class="input-label svelte-6ivx2n">${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <input${attr("id", id)}${attr("type", type)}${attr("value", value)}${attr("placeholder", placeholder)}${attr("required", required, true)}${attr("disabled", disabled, true)}${attr("readonly", readonly, true)}${attr_class("input-field svelte-6ivx2n", void 0, { "error": error })}${attr("aria-invalid", !!error)}${attr("aria-describedby", error ? `${id}-error` : void 0)}/> `);
    if (error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr("id", `${stringify(id)}-error`)} class="input-error svelte-6ivx2n">${escape_html(error)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, {
      type,
      label,
      value,
      placeholder,
      error,
      required,
      disabled,
      readonly,
      id
    });
  });
}
function Textarea($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let label = fallback($$props["label"], "");
    let value = fallback($$props["value"], "");
    let placeholder = fallback($$props["placeholder"], "");
    let error = fallback($$props["error"], "");
    let required = fallback($$props["required"], false);
    let disabled = fallback($$props["disabled"], false);
    let readonly = fallback($$props["readonly"], false);
    let rows = fallback($$props["rows"], 4);
    let id = fallback($$props["id"], () => Math.random().toString(36).substring(7), true);
    $$renderer2.push(`<div class="textarea-group svelte-1eo2upp">`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", id)} class="textarea-label svelte-1eo2upp">${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <textarea${attr("id", id)}${attr("placeholder", placeholder)}${attr("required", required, true)}${attr("disabled", disabled, true)}${attr("readonly", readonly, true)}${attr("rows", rows)}${attr_class("textarea-field svelte-1eo2upp", void 0, { "error": error })}${attr("aria-invalid", !!error)}${attr("aria-describedby", error ? `${id}-error` : void 0)}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> `);
    if (error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr("id", `${stringify(id)}-error`)} class="textarea-error svelte-1eo2upp">${escape_html(error)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, {
      label,
      value,
      placeholder,
      error,
      required,
      disabled,
      readonly,
      rows,
      id
    });
  });
}
function Select($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let label = fallback($$props["label"], "");
    let value = fallback($$props["value"], "");
    let options = fallback($$props["options"], () => [], true);
    let error = fallback($$props["error"], "");
    let required = fallback($$props["required"], false);
    let disabled = fallback($$props["disabled"], false);
    let id = fallback($$props["id"], () => Math.random().toString(36).substring(7), true);
    $$renderer2.push(`<div class="select-group svelte-kt0fiv">`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", id)} class="select-label svelte-kt0fiv">${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    $$renderer2.select(
      {
        id,
        value,
        required,
        disabled,
        class: "select-field",
        "aria-invalid": !!error,
        "aria-describedby": error ? `${id}-error` : void 0
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(options);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let option = each_array[$$index];
          $$renderer3.option({ value: option.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(` `);
    if (error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr("id", `${stringify(id)}-error`)} class="select-error svelte-kt0fiv">${escape_html(error)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { label, value, options, error, required, disabled, id });
  });
}
function Checkbox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let checked = fallback($$props["checked"], false);
    let error = fallback($$props["error"], "");
    let disabled = fallback($$props["disabled"], false);
    let id = fallback($$props["id"], () => Math.random().toString(36).substring(7), true);
    $$renderer2.push(`<div class="checkbox-group svelte-m5vqja"><label${attr("for", id)} class="checkbox-label svelte-m5vqja"><input${attr("id", id)} type="checkbox"${attr("checked", checked, true)}${attr("disabled", disabled, true)} class="checkbox-field svelte-m5vqja"${attr("aria-invalid", !!error)}${attr("aria-describedby", error ? `${id}-error` : void 0)}/> <span class="checkbox-text svelte-m5vqja"><!--[-->`);
    slot($$renderer2, $$props, "default", {}, null);
    $$renderer2.push(`<!--]--></span></label> `);
    if (error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr("id", `${stringify(id)}-error`)} class="checkbox-error svelte-m5vqja">${escape_html(error)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { checked, error, disabled, id });
  });
}
const tableStyles = {
  wrapper: "border border-gray-200 rounded-lg overflow-hidden",
  table: "min-w-full divide-y divide-gray-200",
  thead: "bg-gray-50",
  tbody: "bg-white divide-y divide-gray-200",
  th: "text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",
  td: "px-6 py-4 text-gray-700 whitespace-nowrap",
  tr: "hover:bg-gray-50 transition-colors"
};
const filterStyles = {
  container: "flex gap-1 p-1 bg-gray-100 rounded-lg w-fit",
  button: "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
  buttonActive: "bg-gray-900 text-white",
  buttonInactive: "text-gray-700 hover:bg-gray-200"
};
const panelStyles = {
  base: "bg-white border border-gray-200 rounded-lg shadow-sm",
  padded: "p-6",
  header: "border-b border-gray-200 px-6 py-4",
  title: "text-lg font-semibold text-gray-900",
  body: "p-6",
  footer: "border-t border-gray-200 px-6 py-4 bg-gray-50",
  // Variants
  elevated: "shadow-lg hover:shadow-xl transition-shadow"
};
const cardStyles = {
  base: "bg-white rounded-xl overflow-hidden transition-all duration-300",
  interactive: "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
  padded: "p-6",
  title: "text-xl font-semibold text-gray-900 mb-2",
  description: "text-gray-600 line-height-relaxed"
};
const alertStyles = {
  base: "alert-base",
  variants: {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    danger: "alert-danger"
  },
  icon: "alert-icon",
  title: "alert-title",
  message: "alert-message"
};
const badgeStyles = {
  base: "badge-base",
  variants: {
    default: "badge-default",
    primary: "badge-primary",
    success: "badge-success",
    warning: "badge-warning",
    danger: "badge-danger",
    info: "badge-info"
  }
};
const tabStyles = {
  container: "flex gap-1 p-1 bg-gray-100 rounded-lg w-full",
  button: "flex-1 px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 text-center",
  buttonActive: "bg-white text-gray-900 shadow-sm",
  buttonInactive: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
};
const domainComponents = [
  // Example (uncomment and modify for your project):
  // {
  //   name: 'ProductCard',
  //   category: 'E-commerce',
  //   component: ProductCard,
  //   description: 'Display product with image, price, and actions',
  //   props: {
  //     title: 'Sample Product',
  //     price: '$99.99',
  //     image: '/images/product.jpg'
  //   }
  // },
  // {
  //   name: 'DashboardWidget',
  //   category: 'Analytics',
  //   component: DashboardWidget,
  //   description: 'Analytics dashboard widget with charts',
  //   props: {
  //     title: 'Sales Overview',
  //     data: [...]
  //   }
  // }
];
function groupComponentsByCategory(components) {
  return components.reduce((acc, component) => {
    const category = component.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(component);
    return acc;
  }, {});
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const sampleFeature = {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      title: "Feature Title",
      description: "This is how feature cards look in the actual app."
    };
    const sampleTestimonial = {
      name: "Jane Doe",
      role: "CEO, Example Company",
      content: "This testimonial component is exactly what appears in the app.",
      avatar: "https://i.pravatar.cc/150?img=3"
    };
    const sampleService = {
      icon: "/images/icon-1.svg",
      title: "Service Category",
      description: "This service card is the same component used throughout.",
      buttonHref: "#"
    };
    const sampleFAQs = [
      {
        question: "How do FAQ items appear?",
        answer: "This is the exact FAQ component from the app with its accordion behavior."
      },
      {
        question: "Are these styles shared?",
        answer: "Yes, these use the same styles as the FAQ section on the homepage."
      }
    ];
    const sampleTableData = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "Active"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        status: "Pending"
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        status: "Inactive"
      }
    ];
    groupComponentsByCategory(domainComponents);
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Living Theme - UI Component Showcase</title>`);
      });
      $$renderer3.push(`<meta name="description" content="A living showcase of all UI components and styles used in the application"/>`);
    });
    $$renderer2.push(`<div class="theme-container svelte-1y3nc6e"><header class="theme-header svelte-1y3nc6e"><h1 class="svelte-1y3nc6e">Living Theme System</h1> <p class="subtitle svelte-1y3nc6e">Every component here is the ACTUAL component used in the app. When you update a component, this page updates automatically.</p> <div class="tab-navigation svelte-1y3nc6e"><div${attr_class(clsx(tabStyles.container), "svelte-1y3nc6e")}><button${attr_class(`${stringify(tabStyles.button)} ${stringify(tabStyles.buttonActive)}`, "svelte-1y3nc6e")}>Core Design System</button> <button${attr_class(`${stringify(tabStyles.button)} ${stringify(tabStyles.buttonInactive)}`, "svelte-1y3nc6e")}>Hero Components</button> <button${attr_class(`${stringify(tabStyles.button)} ${stringify(tabStyles.buttonInactive)}`, "svelte-1y3nc6e")}>Domain Components</button></div></div></header> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="tab-content svelte-1y3nc6e"><section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">Color Palette</h2> <p class="section-description svelte-1y3nc6e">Semantic colors used throughout the application</p> <div class="color-grid svelte-1y3nc6e"><div class="color-group svelte-1y3nc6e"><h3 class="svelte-1y3nc6e">Primary Colors</h3> <div class="color-swatches svelte-1y3nc6e"><div class="color-swatch bg-primary svelte-1y3nc6e"><span class="svelte-1y3nc6e">Primary</span> <code class="svelte-1y3nc6e">bg-primary</code></div> <div class="color-swatch bg-primary-dark svelte-1y3nc6e"><span class="svelte-1y3nc6e">Primary Dark</span> <code class="svelte-1y3nc6e">bg-primary-dark</code></div> <div class="color-swatch bg-primary-light svelte-1y3nc6e"><span class="svelte-1y3nc6e">Primary Light</span> <code class="svelte-1y3nc6e">bg-primary-light</code></div></div></div> <div class="color-group svelte-1y3nc6e"><h3 class="svelte-1y3nc6e">Status Colors</h3> <div class="color-swatches svelte-1y3nc6e"><div class="color-swatch bg-success svelte-1y3nc6e"><span class="svelte-1y3nc6e">Success</span> <code class="svelte-1y3nc6e">bg-success</code></div> <div class="color-swatch bg-warning svelte-1y3nc6e"><span class="svelte-1y3nc6e">Warning</span> <code class="svelte-1y3nc6e">bg-warning</code></div> <div class="color-swatch bg-danger svelte-1y3nc6e"><span class="svelte-1y3nc6e">Danger</span> <code class="svelte-1y3nc6e">bg-danger</code></div> <div class="color-swatch bg-info svelte-1y3nc6e"><span class="svelte-1y3nc6e">Info</span> <code class="svelte-1y3nc6e">bg-info</code></div></div></div></div></section> <section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">Typography</h2> <p class="section-description svelte-1y3nc6e">Text styles as they appear in the app</p> <div class="typography-samples svelte-1y3nc6e"><h1 class="svelte-1y3nc6e">Heading 1 - Main Title</h1> <h2 class="svelte-1y3nc6e">Heading 2 - Section Title</h2> <h3 class="svelte-1y3nc6e">Heading 3 - Subsection</h3> <h4 class="svelte-1y3nc6e">Heading 4 - Card Title</h4> <p class="svelte-1y3nc6e">Regular paragraph text with <a href="/example">inline link</a> and <strong>bold text</strong>.</p> <p class="text-secondary svelte-1y3nc6e">Secondary text color for descriptions</p> <p class="text-success svelte-1y3nc6e">Success message text</p> <p class="text-danger svelte-1y3nc6e">Error message text</p> <p class="text-warning svelte-1y3nc6e">Warning message text</p> <p class="text-info svelte-1y3nc6e">Info message text</p></div></section> <section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">Buttons</h2> <p class="section-description svelte-1y3nc6e">These are the ACTUAL Button components used everywhere</p> <div class="button-showcase svelte-1y3nc6e"><h3 class="svelte-1y3nc6e">Variants</h3> <div class="button-row svelte-1y3nc6e">`);
      Button($$renderer2, {
        variant: "primary",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Primary`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        variant: "secondary",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Secondary`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        variant: "outline",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Outline`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        variant: "ghost",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Ghost`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div> <h3 class="svelte-1y3nc6e">Sizes</h3> <div class="button-row svelte-1y3nc6e">`);
      Button($$renderer2, {
        size: "small",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Small`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        size: "medium",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Medium`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        size: "large",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Large`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div> <h3 class="svelte-1y3nc6e">States</h3> <div class="button-row svelte-1y3nc6e">`);
      Button($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Normal`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        disabled: true,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Disabled`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        loading: true,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Loading`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div> <h3 class="svelte-1y3nc6e">Full Width</h3> `);
      Button($$renderer2, {
        fullWidth: true,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Full Width Button`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></section> <section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">Form Elements</h2> <p class="section-description svelte-1y3nc6e">Actual form components from the app</p> <div class="form-showcase svelte-1y3nc6e"><div class="form-row svelte-1y3nc6e">`);
      Input($$renderer2, { label: "Text Input", placeholder: "Enter text..." });
      $$renderer2.push(`<!----> `);
      Input($$renderer2, {
        label: "With Error",
        placeholder: "Enter text...",
        error: "This field has an error"
      });
      $$renderer2.push(`<!----></div> <div class="form-row svelte-1y3nc6e">`);
      Input($$renderer2, {
        type: "email",
        label: "Email Input",
        placeholder: "email@example.com",
        required: true
      });
      $$renderer2.push(`<!----> `);
      Input($$renderer2, {
        type: "tel",
        label: "Phone Input",
        placeholder: "+1 (555) 123-4567"
      });
      $$renderer2.push(`<!----></div> `);
      Textarea($$renderer2, {
        label: "Textarea",
        placeholder: "Enter multiple lines...",
        rows: 4
      });
      $$renderer2.push(`<!----> `);
      Select($$renderer2, {
        label: "Select Dropdown",
        options: [
          { value: "", label: "Choose an option" },
          { value: "opt1", label: "Option 1" },
          { value: "opt2", label: "Option 2" }
        ]
      });
      $$renderer2.push(`<!----> `);
      Checkbox($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->I agree to the terms and conditions`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></section> <section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">Alerts &amp; Messages</h2> <p class="section-description svelte-1y3nc6e">Alert styles used throughout the app</p> <div class="alerts-showcase svelte-1y3nc6e"><div${attr_class(`${stringify(alertStyles.base)} ${stringify(alertStyles.variants.success)}`, "svelte-1y3nc6e")}><svg${attr_class(clsx(alertStyles.icon), "svelte-1y3nc6e")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" class="svelte-1y3nc6e"></path></svg> <div class="svelte-1y3nc6e"><div${attr_class(clsx(alertStyles.title), "svelte-1y3nc6e")}>Success!</div> <div${attr_class(clsx(alertStyles.message), "svelte-1y3nc6e")}>Your action was completed successfully.</div></div></div> <div${attr_class(`${stringify(alertStyles.base)} ${stringify(alertStyles.variants.warning)}`, "svelte-1y3nc6e")}><svg${attr_class(clsx(alertStyles.icon), "svelte-1y3nc6e")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" class="svelte-1y3nc6e"></path></svg> <div class="svelte-1y3nc6e"><div${attr_class(clsx(alertStyles.title), "svelte-1y3nc6e")}>Warning</div> <div${attr_class(clsx(alertStyles.message), "svelte-1y3nc6e")}>Please review this important information.</div></div></div> <div${attr_class(`${stringify(alertStyles.base)} ${stringify(alertStyles.variants.danger)}`, "svelte-1y3nc6e")}><svg${attr_class(clsx(alertStyles.icon), "svelte-1y3nc6e")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class="svelte-1y3nc6e"></path></svg> <div class="svelte-1y3nc6e"><div${attr_class(clsx(alertStyles.title), "svelte-1y3nc6e")}>Error</div> <div${attr_class(clsx(alertStyles.message), "svelte-1y3nc6e")}>Something went wrong. Please try again.</div></div></div> <div${attr_class(`${stringify(alertStyles.base)} ${stringify(alertStyles.variants.info)}`, "svelte-1y3nc6e")}><svg${attr_class(clsx(alertStyles.icon), "svelte-1y3nc6e")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class="svelte-1y3nc6e"></path></svg> <div class="svelte-1y3nc6e"><div${attr_class(clsx(alertStyles.title), "svelte-1y3nc6e")}>Information</div> <div${attr_class(clsx(alertStyles.message), "svelte-1y3nc6e")}>Here's some helpful information for you.</div></div></div></div></section> <section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">Badges</h2> <p class="section-description svelte-1y3nc6e">Badge styles for labels and status indicators</p> <div class="badge-showcase svelte-1y3nc6e"><span${attr_class(`${stringify(badgeStyles.base)} ${stringify(badgeStyles.variants.default)}`, "svelte-1y3nc6e")}>Default</span> <span${attr_class(`${stringify(badgeStyles.base)} ${stringify(badgeStyles.variants.primary)}`, "svelte-1y3nc6e")}>Primary</span> <span${attr_class(`${stringify(badgeStyles.base)} ${stringify(badgeStyles.variants.success)}`, "svelte-1y3nc6e")}>Success</span> <span${attr_class(`${stringify(badgeStyles.base)} ${stringify(badgeStyles.variants.warning)}`, "svelte-1y3nc6e")}>Warning</span> <span${attr_class(`${stringify(badgeStyles.base)} ${stringify(badgeStyles.variants.danger)}`, "svelte-1y3nc6e")}>Danger</span> <span${attr_class(`${stringify(badgeStyles.base)} ${stringify(badgeStyles.variants.info)}`, "svelte-1y3nc6e")}>Info</span></div></section> <section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">Tables</h2> <p class="section-description svelte-1y3nc6e">Table styles using centralized definitions</p> <div${attr_class(clsx(tableStyles.wrapper), "svelte-1y3nc6e")}><table${attr_class(clsx(tableStyles.table), "svelte-1y3nc6e")}><thead${attr_class(clsx(tableStyles.thead), "svelte-1y3nc6e")}><tr class="svelte-1y3nc6e"><th${attr_class(clsx(tableStyles.th), "svelte-1y3nc6e")}>ID</th><th${attr_class(clsx(tableStyles.th), "svelte-1y3nc6e")}>Name</th><th${attr_class(clsx(tableStyles.th), "svelte-1y3nc6e")}>Email</th><th${attr_class(clsx(tableStyles.th), "svelte-1y3nc6e")}>Status</th></tr></thead><tbody${attr_class(clsx(tableStyles.tbody), "svelte-1y3nc6e")}><!--[-->`);
      const each_array = ensure_array_like(sampleTableData);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let row = each_array[$$index];
        $$renderer2.push(`<tr${attr_class(clsx(tableStyles.tr), "svelte-1y3nc6e")}><td${attr_class(clsx(tableStyles.td), "svelte-1y3nc6e")}>${escape_html(row.id)}</td><td${attr_class(clsx(tableStyles.td), "svelte-1y3nc6e")}>${escape_html(row.name)}</td><td${attr_class(clsx(tableStyles.td), "svelte-1y3nc6e")}>${escape_html(row.email)}</td><td${attr_class(clsx(tableStyles.td), "svelte-1y3nc6e")}><span${attr_class(
          `${stringify(badgeStyles.base)} ${stringify(row.status === "Active" ? badgeStyles.variants.success : row.status === "Pending" ? badgeStyles.variants.warning : badgeStyles.variants.default)}`,
          "svelte-1y3nc6e"
        )}>${escape_html(row.status)}</span></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div></section> <section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">Filter Tabs</h2> <p class="section-description svelte-1y3nc6e">Filter component styles</p> <div${attr_class(clsx(filterStyles.container), "svelte-1y3nc6e")}><button${attr_class(
        `${stringify(filterStyles.button)} ${stringify(
          filterStyles.buttonActive
        )}`,
        "svelte-1y3nc6e"
      )}>All Items</button> <button${attr_class(
        `${stringify(filterStyles.button)} ${stringify(filterStyles.buttonInactive)}`,
        "svelte-1y3nc6e"
      )}>Active</button> <button${attr_class(
        `${stringify(filterStyles.button)} ${stringify(filterStyles.buttonInactive)}`,
        "svelte-1y3nc6e"
      )}>Pending</button></div></section> <section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">Cards &amp; Panels</h2> <p class="section-description svelte-1y3nc6e">Panel components using shared styles</p> <div class="panels-grid svelte-1y3nc6e"><div${attr_class(`${stringify(panelStyles.base)} ${stringify(panelStyles.padded)}`, "svelte-1y3nc6e")}><h3${attr_class(clsx(panelStyles.title), "svelte-1y3nc6e")}>Basic Panel</h3> <p class="svelte-1y3nc6e">This panel uses centralized styles that are shared across the app.</p></div> <div${attr_class(`${stringify(panelStyles.base)} ${stringify(panelStyles.elevated)}`, "svelte-1y3nc6e")}><div${attr_class(clsx(panelStyles.header), "svelte-1y3nc6e")}><h3${attr_class(clsx(panelStyles.title), "svelte-1y3nc6e")}>Panel with Header</h3></div> <div${attr_class(clsx(panelStyles.body), "svelte-1y3nc6e")}><p class="svelte-1y3nc6e">Content goes here</p></div> <div${attr_class(clsx(panelStyles.footer), "svelte-1y3nc6e")}>Footer content</div></div> <div${attr_class(`${stringify(cardStyles.base)} ${stringify(cardStyles.padded)} ${stringify(cardStyles.interactive)}`, "svelte-1y3nc6e")}><h3${attr_class(clsx(cardStyles.title), "svelte-1y3nc6e")}>Interactive Card</h3> <p${attr_class(clsx(cardStyles.description), "svelte-1y3nc6e")}>This card has hover effects and transitions.</p></div></div></section> <section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">App Components</h2> <p class="section-description svelte-1y3nc6e">These are the EXACT components used in the application</p> <div class="component-gallery svelte-1y3nc6e"><div class="component-item svelte-1y3nc6e"><h3 class="svelte-1y3nc6e">Feature Card</h3> `);
      FeatureCard($$renderer2, spread_props([sampleFeature]));
      $$renderer2.push(`<!----></div> <div class="component-item svelte-1y3nc6e"><h3 class="svelte-1y3nc6e">Service Card</h3> `);
      ServiceCard($$renderer2, spread_props([sampleService]));
      $$renderer2.push(`<!----></div> <div class="component-item svelte-1y3nc6e"><h3 class="svelte-1y3nc6e">Testimonial Card</h3> `);
      TestimonialCard($$renderer2, spread_props([sampleTestimonial]));
      $$renderer2.push(`<!----></div> <div class="component-item svelte-1y3nc6e"><h3 class="svelte-1y3nc6e">Stats Grid</h3> `);
      StatsGrid($$renderer2, { backgroundColor: "var(--color-primary)", textColor: "white" });
      $$renderer2.push(`<!----></div> <div class="component-item svelte-1y3nc6e"><h3 class="svelte-1y3nc6e">FAQ Component</h3> `);
      FAQ($$renderer2, { items: sampleFAQs });
      $$renderer2.push(`<!----></div></div></section> <section class="theme-section svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">Modals</h2> <p class="section-description svelte-1y3nc6e">Modal system used throughout the app</p> <div class="button-row svelte-1y3nc6e">`);
      Button($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Open Alert Modal`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Open Form Modal`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Open Confirm Modal`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></section> <section class="theme-section verification svelte-1y3nc6e"><h2 class="svelte-1y3nc6e">🔍 Verification Checklist</h2> <p class="section-description svelte-1y3nc6e">Use this to verify theme consistency</p> <div class="checklist svelte-1y3nc6e"><label class="checklist-item svelte-1y3nc6e"><input type="checkbox" class="svelte-1y3nc6e"/> <span>Colors update everywhere when changed in variables</span></label> <label class="checklist-item svelte-1y3nc6e"><input type="checkbox" class="svelte-1y3nc6e"/> <span>Button styles match exactly between theme and app</span></label> <label class="checklist-item svelte-1y3nc6e"><input type="checkbox" class="svelte-1y3nc6e"/> <span>Form elements use identical styles</span></label> <label class="checklist-item svelte-1y3nc6e"><input type="checkbox" class="svelte-1y3nc6e"/> <span>Table styles are consistent</span></label> <label class="checklist-item svelte-1y3nc6e"><input type="checkbox" class="svelte-1y3nc6e"/> <span>Components render identically here and in app</span></label> <label class="checklist-item svelte-1y3nc6e"><input type="checkbox" class="svelte-1y3nc6e"/> <span>No hardcoded colors (all use semantic classes)</span></label></div></section></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
