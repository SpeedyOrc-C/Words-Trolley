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

    let {value = $bindable([]), onchange: _onchange = () => {}}: { value: ISyllable[], onchange: () => void } = $props()
    let rawValue = $state(value.map(s => new Syllable(s.Initial, s.Final, s.Tone).Pinyin).join(" "))
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
            _onchange()
        }
    }

    function onfocusin()
    {
        if (! error)
            rawValue = value.map(s => new Syllable(s.Initial, s.Final, s.Tone).PinyinWithToneNumber).join(" ")
    }

    function onfocusout()
    {
        if (! error)
            rawValue = value.map(s => new Syllable(s.Initial, s.Final, s.Tone).Pinyin).join(" ")
    }
</script>

<input type="text" bind:value={rawValue}
       onkeydown={pinyinSyllablesOverrider.OnKeyDown}
       onkeyup={pinyinSyllablesOverrider.OnKeyUp}
       {onchange} {onfocusin} {onfocusout}
       class="input" class:input-error={error}
       autocorrect="off" autocomplete="off" autocapitalize="off"
>
