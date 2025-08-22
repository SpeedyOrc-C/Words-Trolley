<script lang="ts">
	import {_} from "$lib/i18n"
	import * as M from "$lib/components/ui/navigation-menu"
	import * as Card from "$lib/components/ui/card"
	import {Button} from "$lib/components/ui/button"
	import {House, Plus, BookOpen, BookCheck, SquarePen} from "@lucide/svelte"

	const {data} = $props()
</script>

<div class="p-2 sticky top-0 bg-background shadow">
	<M.Root>
		<M.List>

			<M.Item>
				<M.Link href="/">
					<div class="flex items-center gap-2">
						<House/>
						<div>{$_.home._}</div>
					</div>
				</M.Link>
			</M.Item>

			{#if data.user?.id === data.creator}
				<M.Item>
					<M.Link href="/new">
						<div class="flex items-center gap-2">
							<Plus/>
							<div>{$_.new._}</div>
						</div>
					</M.Link>
				</M.Item>
			{/if}

		</M.List>
	</M.Root>
</div>

<main class="mx-auto p-4 w-full max-w-7xl flex gap-4 flex-wrap">
	{#each data.sets as {name, id}}
		<Card.Root class="w-full sm:max-w-sm">

			<Card.Content class="flex flex-col gap-6">

				<header class="grow flex items-center justify-around">
					<div class="text-xl text-center">
						{name}
					</div>
				</header>

				<div class="flex justify-between gap-2">

					<Button href="/learn/{id}" class="flex-1">
						<BookOpen />
						{$_.set.learn}
					</Button>

					<Button href="/test/{id}" variant="outline" class="flex-1">
						<BookCheck/>
						{$_.set.test}
					</Button>

					<Button href="/edit/{id}" variant="secondary" class="flex-1">
						<SquarePen />
						{$_.edit}
					</Button>

				</div>

			</Card.Content>

		</Card.Root>
	{/each}
</main>
