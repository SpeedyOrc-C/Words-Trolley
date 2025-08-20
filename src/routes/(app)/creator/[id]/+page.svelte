<script lang="ts">
	import {_} from "$lib/i18n"
	import * as NavigationMenu from "$lib/components/ui/navigation-menu"
	import * as Card from "$lib/components/ui/card"
	import {Button} from "$lib/components/ui/button"

	const {data} = $props()
</script>

<div class="p-2 top-0 sticky shadow">
	<NavigationMenu.Root>
		<NavigationMenu.List>

			<NavigationMenu.Item>
				<NavigationMenu.Link>
					<a href="/" class="px-3">{$_.home._}</a>
				</NavigationMenu.Link>
			</NavigationMenu.Item>

			{#if data.user?.id === data.creator}
				<NavigationMenu.Item>
					<NavigationMenu.Link>
						<a href="/new" class="px-3">
							{$_.new._}
						</a>
					</NavigationMenu.Link>
				</NavigationMenu.Item>
			{/if}

		</NavigationMenu.List>
	</NavigationMenu.Root>
</div>

<main class="mx-auto p-4 w-full max-w-7xl flex gap-4 flex-wrap">
	{#each data.sets as {name, id}}
		<Card.Root class="w-full sm:max-w-md">

			<Card.Content class="flex flex-col gap-6">

				<header class="grow flex items-center justify-around">
					<div class="text-xl text-center">
						{name}
					</div>
				</header>

				<div class="flex flex-col gap-2">

					<Button href="/learn/{id}">
						{$_.set.learn}
					</Button>

					<Button href="/test/{id}" variant="outline">
						{$_.set.test}
					</Button>

					<Button href="/edit/{id}" variant="secondary">
						{$_.edit}
					</Button>

				</div>

			</Card.Content>

		</Card.Root>
	{/each}
</main>
