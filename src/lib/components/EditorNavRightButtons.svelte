<script lang="ts">
   import {goto} from "$app/navigation"
   import {_} from "$lib/i18n/store"
   import Button from "$lib/components/ui/button/button.svelte"
   import {settingsOpened} from "$lib/settings/store"
   import Settings from "@lucide/svelte/icons/settings"
   import Home from "@lucide/svelte/icons/home"

   const {saved} : { saved: boolean } = $props()

   async function GuardedGoto(url: string) {
		if (!saved) {
			const ok = confirm($_.editor.you_have_unsaved_changes)

			if (!ok) return
		}

		await goto(url)
	}
</script>

<div class="hidden sm:block">
	<Button onclick={() => settingsOpened.set(true)} variant="outline">
		<Settings />
		{$_.settings._}
	</Button>
</div>

<div class="hidden sm:block">
	<Button onclick={() => GuardedGoto("/")} variant="secondary">
		<Home />
		{$_.home._}
	</Button>
</div>

<div class="sm:hidden">
	<Button
		aria-label={$_.settings._}
		onclick={() => settingsOpened.set(true)}
		size="icon"
		variant="outline"
	>
		<Settings />
	</Button>
</div>

<div class="sm:hidden">
	<Button
		aria-label={$_.home._}
		onclick={() => GuardedGoto("/")}
		size="icon"
		variant="secondary"
	>
		<Home />
	</Button>
</div>
