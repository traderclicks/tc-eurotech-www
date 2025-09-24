import { Z as fallback, a2 as attr, $ as escape_html, a7 as attr_class, _ as bind_props, a3 as stringify, a1 as ensure_array_like, a5 as slot } from "./index2.js";
import "./Checkbox.svelte_svelte_type_style_lang.js";
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
    slot($$renderer2, $$props, "default", {});
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
export {
  Checkbox as C,
  Input as I,
  Select as S,
  Textarea as T
};
