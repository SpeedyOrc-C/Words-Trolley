import {derived, writable} from "svelte/store"
import {settings} from "."
import {ColourScheme} from ".."

export const prefersDarkScheme = writable(false)

export const shouldUseDarkScheme = derived(
   [prefersDarkScheme, settings],
   ([prefersDarkScheme, settings]) =>
      prefersDarkScheme && settings.ColourScheme == ColourScheme.System ||
      settings.ColourScheme == ColourScheme.Dark
)

export const actualColourScheme = derived(shouldUseDarkScheme,
   shouldUseDarkScheme =>
      shouldUseDarkScheme ? ColourScheme.Dark : ColourScheme.Light
)
