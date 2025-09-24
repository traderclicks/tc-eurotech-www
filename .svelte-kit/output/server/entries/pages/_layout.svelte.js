import { Z as fallback, _ as bind_props, $ as escape_html, a0 as store_get, a1 as ensure_array_like, a2 as attr, a3 as stringify, a4 as spread_props, a5 as slot, a6 as unsubscribe_stores, a7 as attr_class, a8 as head } from "../../chunks/index2.js";
import { m as modals } from "../../chunks/Checkbox.svelte_svelte_type_style_lang.js";
import { I as Input, S as Select, T as Textarea, C as Checkbox } from "../../chunks/Checkbox.js";
import { B as Button, h as html } from "../../chunks/Button.js";
/* empty css                                                     */
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "../../chunks/state.svelte.js";
function ContactForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let title = fallback($$props["title"], "Contact Form");
    let subtitle = fallback($$props["subtitle"], "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
    let submitText = fallback($$props["submitText"], "Send Message");
    let showPhone = fallback($$props["showPhone"], true);
    let form = {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
      consent: false
    };
    let errors = {};
    let isSubmitting = false;
    const serviceOptions = [
      { value: "", label: "Select an option" },
      { value: "option-1", label: "Option One" },
      { value: "option-2", label: "Option Two" },
      { value: "option-3", label: "Option Three" },
      { value: "option-4", label: "Option Four" },
      { value: "option-5", label: "Option Five" },
      { value: "other", label: "Other" }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="contact-form svelte-fq8g2m">`);
      if (title || subtitle) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="form-header svelte-fq8g2m">`);
        if (title) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<h3 class="form-title svelte-fq8g2m">${escape_html(title)}</h3>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (subtitle) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<p class="form-subtitle svelte-fq8g2m">${escape_html(subtitle)}</p>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <form><div class="form-grid svelte-fq8g2m"><div class="form-group svelte-fq8g2m">`);
      Input($$renderer3, {
        label: "Name *",
        error: errors.name,
        placeholder: "John Doe",
        required: true,
        get value() {
          return form.name;
        },
        set value($$value) {
          form.name = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="form-group svelte-fq8g2m">`);
      Input($$renderer3, {
        type: "email",
        label: "Email *",
        error: errors.email,
        placeholder: "john@example.com",
        required: true,
        get value() {
          return form.email;
        },
        set value($$value) {
          form.email = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> `);
      if (showPhone) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="form-group svelte-fq8g2m">`);
        Input($$renderer3, {
          type: "tel",
          label: "Phone",
          error: errors.phone,
          placeholder: "+1 (555) 123-4567",
          get value() {
            return form.phone;
          },
          set value($$value) {
            form.phone = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div class="form-group svelte-fq8g2m">`);
      Input($$renderer3, {
        label: "Company",
        placeholder: "Acme Corp",
        get value() {
          return form.company;
        },
        set value($$value) {
          form.company = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="form-group full-width svelte-fq8g2m">`);
      Select($$renderer3, {
        label: "Service",
        options: serviceOptions,
        error: errors.service,
        get value() {
          return form.service;
        },
        set value($$value) {
          form.service = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="form-group full-width svelte-fq8g2m">`);
      Textarea($$renderer3, {
        label: "Message *",
        error: errors.message,
        placeholder: "Tell us about your project...",
        rows: 5,
        required: true,
        get value() {
          return form.message;
        },
        set value($$value) {
          form.message = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="form-group full-width svelte-fq8g2m">`);
      Checkbox($$renderer3, {
        error: errors.consent,
        get checked() {
          return form.consent;
        },
        set checked($$value) {
          form.consent = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->I agree to the <a href="/privacy-policy" target="_blank">Privacy Policy</a> and <a href="/terms" target="_blank">Terms of Service</a>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      Button($$renderer3, {
        type: "submit",
        variant: "primary",
        size: "large",
        fullWidth: true,
        loading: isSubmitting,
        disabled: isSubmitting,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html(submitText)}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></form></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { title, subtitle, submitText, showPhone });
  });
}
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    function getVideoEmbedUrl(url) {
      if (url.includes("youtube.com/watch")) {
        const videoId = new URL(url).searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes("vimeo.com/")) {
        const videoId = url.split("/").pop();
        return `https://player.vimeo.com/video/${videoId}`;
      }
      return url;
    }
    if (typeof document !== "undefined") {
      document.body.style.overflow = store_get($$store_subs ??= {}, "$modals", modals).length > 0 ? "hidden" : "";
    }
    $$renderer2.push(`<!--[-->`);
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$modals", modals));
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let modal = each_array[i];
      $$renderer2.push(`<div class="modal-backdrop svelte-ta60gp" role="dialog" aria-modal="true"${attr("aria-labelledby", `modal-title-${stringify(modal.id)}`)}><div class="modal-container svelte-ta60gp">`);
      if (modal.type !== "image") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="modal-header svelte-ta60gp">`);
        if (modal.title) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<h2${attr("id", `modal-title-${stringify(modal.id)}`)} class="modal-title svelte-ta60gp">${escape_html(modal.title)}</h2>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <button class="modal-close svelte-ta60gp" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="modal-content svelte-ta60gp">`);
      if (modal.type === "form") {
        $$renderer2.push("<!--[-->");
        ContactForm($$renderer2, spread_props([modal.props]));
      } else {
        $$renderer2.push("<!--[!-->");
        if (modal.type === "image") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="image-modal svelte-ta60gp"><button class="image-close svelte-ta60gp" aria-label="Close image"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button> <img${attr("src", modal.content.src)}${attr("alt", modal.content.alt || "")} class="svelte-ta60gp"/></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (modal.type === "video") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="video-modal svelte-ta60gp"><iframe${attr("src", getVideoEmbedUrl(modal.content.url))}${attr("title", modal.title || "Video")} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="svelte-ta60gp"></iframe></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (modal.type === "confirm") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<div class="confirm-modal svelte-ta60gp"><p class="svelte-ta60gp">${escape_html(modal.content)}</p> <div class="confirm-buttons svelte-ta60gp"><button class="btn btn-secondary svelte-ta60gp">Cancel</button> <button class="btn btn-primary svelte-ta60gp">Confirm</button></div></div>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (modal.type === "alert") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<div class="alert-modal svelte-ta60gp"><p class="svelte-ta60gp">${escape_html(modal.content)}</p> <button class="btn btn-primary svelte-ta60gp">OK</button></div>`);
              } else {
                $$renderer2.push("<!--[!-->");
                if (modal.type === "custom") {
                  $$renderer2.push("<!--[-->");
                  $$renderer2.push(`<!--[-->`);
                  slot($$renderer2, $$props, "custom", { modal });
                  $$renderer2.push(`<!--]-->`);
                } else {
                  $$renderer2.push("<!--[!-->");
                }
                $$renderer2.push(`<!--]-->`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function NavigationMenu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isOpen = fallback($$props["isOpen"], false);
    const navItems = [
      { label: "Home", href: "/" },
      { label: "About Us", href: "#about" },
      {
        label: "Services",
        expandable: true,
        items: [
          { label: "Jaguar & Land Rover", href: "#jaguar-landrover" },
          { label: "BMW & Mini", href: "#bmw-mini" },
          { label: "Insurance Claims", href: "#insurance" },
          { label: "Structural Repairs", href: "#structural" },
          { label: "Paintless Dent Removal", href: "#paintless" }
        ]
      },
      {
        label: "Our Brands",
        expandable: true,
        items: [
          { label: "Jaguar", href: "#jaguar" },
          { label: "Land Rover", href: "#landrover" },
          { label: "Range Rover", href: "#rangerover" },
          { label: "BMW", href: "#bmw" },
          { label: "Mini Cooper", href: "#mini" }
        ]
      },
      { label: "Gallery", href: "#gallery" },
      { label: "Contact Us", href: "#contact" }
    ];
    let expandedItems = /* @__PURE__ */ new Set();
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="overlay svelte-o1co8r"></div> <nav class="navigation-menu svelte-o1co8r"><button class="close-btn svelte-o1co8r" aria-label="Close menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"></line><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"></line></svg></button> <div class="search-container svelte-o1co8r"><input type="search" placeholder="Search Eurotech" class="search-input svelte-o1co8r"/> <svg class="search-icon svelte-o1co8r" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"></circle><path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"></path></svg></div> <ul class="nav-list svelte-o1co8r"><!--[-->`);
      const each_array = ensure_array_like(navItems);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let item = each_array[$$index_1];
        $$renderer2.push(`<li class="nav-item svelte-o1co8r">`);
        if (item.expandable) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button${attr_class("nav-link expandable svelte-o1co8r", void 0, { "expanded": expandedItems.has(item.label) })}><span>${escape_html(item.label)}</span> <svg class="expand-icon svelte-o1co8r" width="20" height="20" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2"></line><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"></line></svg></button> `);
          if (expandedItems.has(item.label)) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<ul class="submenu svelte-o1co8r"><!--[-->`);
            const each_array_1 = ensure_array_like(item.items);
            for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
              let subItem = each_array_1[$$index];
              $$renderer2.push(`<li><a${attr("href", subItem.href)} class="submenu-link svelte-o1co8r">${escape_html(subItem.label)}</a></li>`);
            }
            $$renderer2.push(`<!--]--></ul>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<a${attr("href", item.href)} class="nav-link svelte-o1co8r">${escape_html(item.label)}</a>`);
        }
        $$renderer2.push(`<!--]--></li>`);
      }
      $$renderer2.push(`<!--]--></ul> <div class="menu-footer svelte-o1co8r"><button class="quote-btn svelte-o1co8r">Get a Quote</button> <div class="contact-info svelte-o1co8r"><a href="tel:095731093" class="contact-link svelte-o1co8r"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg> (09) 573 1093</a> <a href="mailto:info@eurotech.co.nz" class="contact-link svelte-o1co8r"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg> info@eurotech.co.nz</a></div></div></nav>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen });
  });
}
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isScrolled = fallback($$props["isScrolled"], false);
    let isMenuOpen = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<header${attr_class("header svelte-1elxaub", void 0, { "scrolled": isScrolled })}><div class="container"><nav class="nav svelte-1elxaub"><a href="/" class="logo svelte-1elxaub"><img src="/eurotech-main-logo.png" alt="Eurotech Auto Repair Centre" class="svelte-1elxaub"/></a> <div class="nav-right svelte-1elxaub"><img src="/eurotech-logo.png" alt="Eurotech" class="logo-small svelte-1elxaub"/> <div class="nav-cta svelte-1elxaub">`);
      Button($$renderer3, {
        variant: "primary",
        size: "medium",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Get Quote`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <button class="menu-toggle svelte-1elxaub" aria-label="Toggle menu"${attr("aria-expanded", isMenuOpen)}><span class="svelte-1elxaub">Menu</span> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="svelte-1elxaub"><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"></line><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"></line><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"></line></svg></button></div></nav></div></header> `);
      NavigationMenu($$renderer3, {
        get isOpen() {
          return isMenuOpen;
        },
        set isOpen($$value) {
          isMenuOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { isScrolled });
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    $$renderer2.push(`<footer class="footer svelte-jz8lnl"><div class="container"><div class="footer-grid svelte-jz8lnl"><div class="footer-column svelte-jz8lnl"><div class="footer-logo svelte-jz8lnl"><img src="/eurotech-logo.png" alt="Eurotech Auto Repair Centre" width="150" height="40"/></div> <p class="footer-description svelte-jz8lnl">New Zealand's only factory-authorized Jaguar/Land Rover structural repairer.
          European vehicle specialists with 20+ years experience.</p> <div class="social-links svelte-jz8lnl"><a href="https://www.facebook.com/eurotechauto" aria-label="Facebook" class="svelte-jz8lnl"><img src="/icons/facebook.svg" alt="Facebook" width="20" height="20"/></a> <a href="https://www.instagram.com/eurotechauto" aria-label="Instagram" class="svelte-jz8lnl"><img src="/icons/instagram.svg" alt="Instagram" width="20" height="20"/></a> <a href="https://g.page/eurotech-auto-repair" aria-label="Google Business" class="svelte-jz8lnl"><img src="/icons/google.svg" alt="Google" width="20" height="20"/></a></div></div> <div class="footer-column svelte-jz8lnl"><h3 class="footer-heading svelte-jz8lnl">Services</h3> <ul class="footer-links svelte-jz8lnl"><li class="svelte-jz8lnl"><a href="#jaguar-landrover" class="svelte-jz8lnl">Jaguar &amp; Land Rover</a></li> <li class="svelte-jz8lnl"><a href="#bmw-mini" class="svelte-jz8lnl">BMW &amp; Mini</a></li> <li class="svelte-jz8lnl"><a href="#structural" class="svelte-jz8lnl">Structural Repairs</a></li> <li class="svelte-jz8lnl"><a href="#insurance" class="svelte-jz8lnl">Insurance Claims</a></li> <li class="svelte-jz8lnl"><a href="#paintless" class="svelte-jz8lnl">Paintless Dent Removal</a></li></ul></div> <div class="footer-column svelte-jz8lnl"><h3 class="footer-heading svelte-jz8lnl">Information</h3> <ul class="footer-links svelte-jz8lnl"><li class="svelte-jz8lnl"><a href="#about" class="svelte-jz8lnl">About Eurotech</a></li> <li class="svelte-jz8lnl"><a href="#certifications" class="svelte-jz8lnl">Certifications</a></li> <li class="svelte-jz8lnl"><a href="#gallery" class="svelte-jz8lnl">Gallery</a></li> <li class="svelte-jz8lnl"><a href="/privacy" class="svelte-jz8lnl">Privacy Policy</a></li> <li class="svelte-jz8lnl"><a href="/terms" class="svelte-jz8lnl">Terms &amp; Conditions</a></li></ul></div> <div class="footer-column svelte-jz8lnl"><h3 class="footer-heading svelte-jz8lnl">Contact Us</h3> <div class="contact-info svelte-jz8lnl"><div class="contact-item svelte-jz8lnl"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg> <a href="tel:095731093" class="svelte-jz8lnl">(09) 573 1093</a></div> <div class="contact-item svelte-jz8lnl"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg> <a href="mailto:info@eurotech.co.nz" class="svelte-jz8lnl">info@eurotech.co.nz</a></div> <div class="contact-item svelte-jz8lnl"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg> <span>Mount Wellington, Auckland</span></div> <div class="contact-item svelte-jz8lnl"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg> <span>Mon-Fri: 8:00 AM - 5:00 PM</span></div></div> <button class="footer-cta svelte-jz8lnl">Get a Quote</button></div></div> <div class="footer-bottom svelte-jz8lnl"><p class="copyright svelte-jz8lnl">© ${escape_html(currentYear)} Eurotech Auto Repair Centre. All rights reserved.</p> <div class="footer-bottom-links svelte-jz8lnl"><a href="/privacy" class="svelte-jz8lnl">Privacy Policy</a> <span class="separator svelte-jz8lnl">|</span> <a href="/terms" class="svelte-jz8lnl">Terms of Service</a> <span class="separator svelte-jz8lnl">|</span> <a href="#contact" class="svelte-jz8lnl">Contact</a></div></div> <div class="certifications-bar svelte-jz8lnl"><span>Member of:</span> <img src="/mta-logo.png" alt="MTA Member" width="60" height="30"/> <span>|</span> <span>CRA Accredited</span> <span>|</span> <span>I-Car Gold Certified</span></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let scrollY = 0;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.push(`<meta name="viewport" content="width=device-width, initial-scale=1"/> <link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> ${html(`<script type="application/ld+json">
  ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Page One",
        "alternateName": "Page One Solutions",
        "url": "https://example.com",
        "logo": "https://example.com/logo.png",
        "description": "Premium solutions and services to help you achieve success",
        "foundingDate": "2020",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Main Street",
          "addressLocality": "City",
          "addressRegion": "State",
          "postalCode": "12345",
          "addressCountry": "US"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-555-0100",
          "contactType": "customer service",
          "email": "contact@example.com",
          "areaServed": "US",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://www.facebook.com/pageone",
          "https://twitter.com/pageone",
          "https://www.linkedin.com/company/pageone",
          "https://www.instagram.com/pageone"
        ]
      })}
  <\/script>`)} ${html(`<script type="application/ld+json">
  ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Page One",
        "url": "https://example.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://example.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      })}
  <\/script>`)}`);
    });
    $$renderer2.push(`<div class="app svelte-12qhfyh">`);
    Header($$renderer2, { isScrolled: scrollY > 50 });
    $$renderer2.push(`<!----> <main class="main svelte-12qhfyh"><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></main> `);
    Footer($$renderer2);
    $$renderer2.push(`<!----> `);
    Modal($$renderer2, {});
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _layout as default
};
