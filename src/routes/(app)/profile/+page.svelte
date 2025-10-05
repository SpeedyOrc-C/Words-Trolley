<script lang="ts">
	import {invalidate} from "$app/navigation"
	import {_} from "$lib/i18n/store"
	import {Button} from "$lib/components/ui/button"
	import House from "@lucide/svelte/icons/house"
   import Settings from "@lucide/svelte/icons/settings"
	import {settingsOpened} from "$lib/settings/store"
	import {Label} from "$lib/components/ui/label"
   import {Input} from "$lib/components/ui/input"
	import {toast} from "svelte-sonner"

   const {data} = $props()

   let name = $state(data.profile.name)

   let loading = $state(false)

   async function PutName()
   {
      if (loading)
         return

      loading = true
      const error = await data.service.Profile.PutName(data.user.id, name)
      loading = false

      if (error)
      {
         console.error(error)
         toast.error(error.message)
         return
      }

      invalidate("supabase:auth")
      toast.success($_.my_profile.save.win)
   }
</script>

<svelte:head>
   <title>{$_.my_profile._}</title>
</svelte:head>

<nav class="p-2 sticky top-0 z-20 flex items-center justify-between backdrop-blur-xs">

	<Button href="/" tabindex={0} variant="outline">
		<House />
		{$_.home._}
	</Button>

   <Button onclick={() => settingsOpened.set(true)} variant="outline">
		<Settings />
		{$_.settings._}
	</Button>

</nav>

<header class="text-p-4 text-center text-2xl">
   {$_.my_profile._}
</header>

<main class="m-auto p-4 w-full max-w-md">

   <form class="flex flex-col gap-2" onsubmit={PutName}>
      <Label for="name">
         {$_.my_profile.name}
      </Label>
      <div class="flex gap-2">
         <Input type="text" bind:value={name} id="name" required/>
         <Button type="submit" disabled={loading}>
            {$_.my_profile.save._}
         </Button>
      </div>
   </form>

</main>
