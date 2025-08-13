<script module>
    import {pPinyinWithToneNumber} from "$lib/word/mandarin/parser/pinyin-with-tone-number"
    import {eof, space} from "crazy-parser"
    import {many, some} from "crazy-parser/prefix"

    const parser =
        pPinyinWithToneNumber
            .and(many(some(space).$_(pPinyinWithToneNumber)))._$(eof)
            .map(x => [x[0], ...x[1]])
</script>

<script lang="ts">
    import {type ISyllable, Syllable} from "$lib/word/mandarin"
    import {pinyinSyllablesOverrider} from "$lib/MandarinInputOverrider"

    let {value = $bindable([])}: { value: ISyllable[] } = $props()
    let rawValue = $state("")
    let error = $state(false)

    function onchange()
    {
        const syllables = parser.eval(rawValue.trim().toLowerCase())

        if (syllables instanceof Error)
        {
            error = true
        }
        else
        {
            error = false
            value = syllables
            rawValue = syllables.map(s => s.PinyinWithToneNumber).join(" ")
        }
    }

    function onfocusin()
    {
        if (error)
            return

        rawValue = value.map(s => new Syllable(s.Initial, s.Final, s.Tone).PinyinWithToneNumber).join(" ")
    }

    function onfocusout()
    {
        if (error)
            return

        rawValue = value.map(s => new Syllable(s.Initial, s.Final, s.Tone).Pinyin).join(" ")
    }
</script>

<input type="text" bind:value={rawValue}
       onkeydown={pinyinSyllablesOverrider.OnKeyDown}
       onkeyup={pinyinSyllablesOverrider.OnKeyUp}
       {onchange} {onfocusin} {onfocusout}
       class="input input-sm" class:input-error={error}
       autocorrect="off" autocomplete="off" autocapitalize="off"
>
