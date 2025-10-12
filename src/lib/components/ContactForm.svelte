<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Input from './form/Input.svelte';
  import Textarea from './form/Textarea.svelte';
  import Select from './form/Select.svelte';
  import Checkbox from './form/Checkbox.svelte';
  import Button from './Button.svelte';

  const dispatch = createEventDispatcher();

  export let title = 'Contact Form';
  export let subtitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  export let submitText = 'Send Message';
  export let showPhone = true;

  let form = {
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    consent: false
  };

  let errors: Record<string, string> = {};
  let isSubmitting = false;
  let submitStatus: 'idle' | 'success' | 'error' = 'idle';

  const serviceOptions = [
    { value: '', label: 'Select an option' },
    { value: 'option-1', label: 'Option One' },
    { value: 'option-2', label: 'Option Two' },
    { value: 'option-3', label: 'Option Three' },
    { value: 'option-4', label: 'Option Four' },
    { value: 'option-5', label: 'Option Five' },
    { value: 'other', label: 'Other' }
  ];

  function validateForm() {
    errors = {};

    if (!form.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (showPhone && form.phone && !/^[\d\s\-\+\(\)]+$/.test(form.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!form.message.trim()) {
      errors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    if (!form.consent) {
      errors.consent = 'You must agree to the privacy policy';
    }

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;
    submitStatus = 'idle';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In real implementation, send to your backend
      console.log('Form submitted:', form);

      submitStatus = 'success';
      dispatch('success', form);

      // Reset form after success
      setTimeout(() => {
        form = {
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          consent: false
        };
        submitStatus = 'idle';
      }, 3000);
    } catch (error) {
      submitStatus = 'error';
      dispatch('error', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="contact-form">
  {#if title || subtitle}
    <div class="form-header">
      {#if title}
        <h3 class="form-title">{title}</h3>
      {/if}
      {#if subtitle}
        <p class="form-subtitle">{subtitle}</p>
      {/if}
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-grid">
      <div class="form-group">
        <Input
          label="Name *"
          bind:value={form.name}
          error={errors.name}
          placeholder="John Doe"
          required
        />
      </div>

      <div class="form-group">
        <Input
          type="email"
          label="Email *"
          bind:value={form.email}
          error={errors.email}
          placeholder="john@example.com"
          required
        />
      </div>

      {#if showPhone}
        <div class="form-group">
          <Input
            type="tel"
            label="Phone"
            bind:value={form.phone}
            error={errors.phone}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      {/if}

      <div class="form-group">
        <Input
          label="Company"
          bind:value={form.company}
          placeholder="Acme Corp"
        />
      </div>

      <div class="form-group full-width">
        <Select
          label="Service"
          bind:value={form.service}
          options={serviceOptions}
          error={errors.service}
        />
      </div>

      <div class="form-group full-width">
        <Textarea
          label="Message *"
          bind:value={form.message}
          error={errors.message}
          placeholder="Tell us about your project..."
          rows={5}
          required
        />
      </div>

      <div class="form-group full-width">
        <Checkbox
          bind:checked={form.consent}
          error={errors.consent}
        >
          I agree to the <a href="/privacy-policy" target="_blank">Privacy Policy</a> and <a href="/terms" target="_blank">Terms of Service</a>
        </Checkbox>
      </div>
    </div>

    {#if submitStatus === 'success'}
      <div class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Your message has been sent successfully!</span>
      </div>
    {/if}

    {#if submitStatus === 'error'}
      <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>There was an error sending your message. Please try again.</span>
      </div>
    {/if}

    <Button
      type="submit"
      variant="primary"
      size="large"
      fullWidth
      loading={isSubmitting}
      disabled={isSubmitting}
    >
      {submitText}
    </Button>
  </form>
</div>

<style>
  .contact-form {
    width: 100%;
  }

  .form-header {
    margin-bottom: var(--space-6);
  }

  .form-title {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  .form-subtitle {
    margin: 0;
    color: var(--text-secondary);
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .form-group {
    grid-column: span 1;
  }

  .form-group.full-width {
    grid-column: span 2;
  }

  .alert {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-4);
  }

  .alert-success {
    background: #10b98120;
    color: #10b981;
    border: 1px solid #10b98140;
  }

  .alert-error {
    background: #ef444420;
    color: #ef4444;
    border: 1px solid #ef444440;
  }

  /* Mobile Styles */
  @media (max-width: 640px) {
    .form-grid {
      grid-template-columns: 1fr;
    }

    .form-group,
    .form-group.full-width {
      grid-column: span 1;
    }
  }
</style>