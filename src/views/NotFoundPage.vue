<template>
  <section class="flex flex-col items-center justify-center px-4 py-24 text-center sm:py-32">
    <svg
      class="h-16 w-16 text-brand-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M7 2v7a3 3 0 0 0 3 3v10" />
      <path d="M4 2v5M10 2v5" />
      <path d="M17 2c-1.5 1.5-2.5 4-2.5 6.5 0 2 1 3.5 2.5 3.5v10" />
    </svg>

    <p class="mt-6 text-sm font-bold uppercase tracking-widest text-brand-700">404 — Page not found</p>
    <h1 class="mt-3 text-4xl font-bold text-ink sm:text-5xl">This plate is empty</h1>
    <p class="mx-auto mt-4 max-w-md text-lg text-ink/70">
      We looked everywhere, but there's nothing on the menu at this address.
    </p>

    <RouterLink
      :to="{ name: 'Home' }"
      class="mt-8 rounded-full bg-brand-500 px-8 py-3 font-bold text-white shadow-sm transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
    >
      Back to home
    </RouterLink>
  </section>
</template>
