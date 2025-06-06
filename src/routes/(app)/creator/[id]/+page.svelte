<script lang="ts">
    import JustHomeNavbar from "$lib/JustHomeNavbar.svelte"
    import {_} from "$lib/i18n"

    const {data} = $props()
</script>

<JustHomeNavbar/>

<div>
    <ul class="list w-fit m-auto">
        {#each data.sets as set}
            <li class="list-row flex items-center">

                {#if data.user}

                    {#if data.user.id === data.creator}

                        <a href="/edit/{set.id}">
                            <button class="btn btn-sm btn-soft">
                                {$_("edit")}
                            </button>
                        </a>

                    {/if}

                {/if}

                <div class="text-xl truncate">
                    {set.name}
                </div>

            </li>
        {/each}
    </ul>
</div>
