import { a0 as store_get, _ as escape_html, a7 as unsubscribe_stores } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
import { M as Meta } from "../../chunks/Meta.js";
import { B as Button } from "../../chunks/Button.js";
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let statusCode, statusMessage, isNotFound, title, description;
    statusCode = store_get($$store_subs ??= {}, "$page", page).status;
    statusMessage = store_get($$store_subs ??= {}, "$page", page).error?.message || "Something went wrong";
    isNotFound = statusCode === 404;
    title = isNotFound ? "Page Not Found" : `Error ${statusCode}`;
    description = isNotFound ? "The page you are looking for could not be found." : "An error occurred while processing your request.";
    Meta($$renderer2, { title, description, noindex: true });
    $$renderer2.push(`<!----> <div class="error-page svelte-1j96wlh"><div class="container"><div class="error-content svelte-1j96wlh"><h1 class="error-code svelte-1j96wlh">${escape_html(statusCode)}</h1> <h2 class="error-title svelte-1j96wlh">${escape_html(title)}</h2> <p class="error-message svelte-1j96wlh">${escape_html(statusMessage)}</p> <p class="error-description svelte-1j96wlh">${escape_html(description)}</p> <div class="error-actions svelte-1j96wlh">`);
    Button($$renderer2, {
      href: "/",
      variant: "primary",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Return to Homepage`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    if (isNotFound) {
      $$renderer2.push("<!--[-->");
      Button($$renderer2, {
        href: "/sitemap",
        variant: "secondary",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->View Sitemap`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (isNotFound) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="helpful-links svelte-1j96wlh"><h3 class="svelte-1j96wlh">Helpful Links</h3> <ul class="svelte-1j96wlh"><li><a href="/services" class="svelte-1j96wlh">Our Services</a></li> <li><a href="/about" class="svelte-1j96wlh">About Us</a></li> <li><a href="/contact" class="svelte-1j96wlh">Contact</a></li></ul></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _error as default
};
