import {Language} from "$lib/i18n"
import {EgyptianTransliteration, type ISettings, MandarinScript} from "$lib/settings"
import {writable} from "svelte/store"

export const settingsOpened = writable(false)

export const settings = writable<ISettings>({
	Language: "auto",
	MandarinScript: MandarinScript.Pinyin,
	EgyptianTransliteration: EgyptianTransliteration.ManuelDeCodage,
	PreferredVoice: {
		[Language.ZhCn]: null,
		[Language.ZhTw]: null,
		[Language.EnGb]: null,
		[Language.EnUs]: null,
		[Language.JaJp]: null,
		[Language.FrFr]: null,
		[Language.DeDe]: null,
	}
})
