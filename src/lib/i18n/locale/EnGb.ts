import type {I18nTemplate} from "$lib/i18n/I18nTemplate"
import {Language} from "$lib/i18n/Language"

const EnGb: I18nTemplate = {
	hello: "Hello!",
	login: "Log in",
	signup: "Sign up",
	login_and_signup: "Log in / Sign up",
	logout: "Log out",
	search: "Search",
	email: "Email",
	password: "Password",
	submit: "Submit",
	name: "Name",
	display_name: "Display name",
	continue: "Continue",
	return: "Return",
	edit: "Edit",
	delete: "Delete",
	insert: "Insert",
	close: "Close",
	more: "More",
	word_set: "Word set",
	goto: "Go to",
	copy: "Copy",
	copied: "Copied",
	paste: "Paste",
	pasted: "Pasted",
	not_specified: "Not specified",
	onboarding: {
		complete_your_profile: "Complete your profile",
	},
	wiktionary: "Wiktionary",
	my_profile: {
		_: "My Profile",
		name: "Name",
		save: {
			_: "Save",
			win: "Saved successfully",
		}
	},
	settings: {
		_: "Settings",
		follows_your_system: "Follows your system",
		ui_language: "UI Language",
		learning: {
			_: "Learning",
			show_meaning_and_word_at_the_same_time: "Show word and its meaning at the same time",
			show_pronunciation: "Show pronunciation while learning",
		},
		editor: {
			_: "Editor",
			autosave: "Autosave",
		},
		mandarin: {
			_: "Mandarin",
			spelling_scheme: "Spelling Scheme",
		},
		egyptian: {
			_: "Egyptian",
			transliteration_for_read: "Transliteration Scheme for Reading",
			transliteration_for_edit: "Transliteration Scheme for Editing",
			hieroglyphs_font: "Hieroglyphs Font",
		},
		hieroglyphs_style: {
			_: "Hieroglyphs Style",
			sans_serif: "Sans-serif",
			colourful: "Colourful",
		},
		customise_voices: {
			_: "Customise Voices",
			tip: "Tick the languages you want to change the voice for.",
		},
	},
	home: {
		_: "Home",
		welcome_to_words_trolley: "Welcome to Words Trolley",
		welcome_back: "Welcome back",
		create_a_word_set: "Create a word set",
		created_by_me: "Created by me",
		saved_by_me: "Saved by me",
	},
	new: {
		_: "Create",
		create_a_new_word_set: "Create a new word set...",
	},
	set: {
		title: name => `Word set -  ${name}`,
		learn: "Learn",
		test: "Test",
		preview: "Preview",
		origin: "Origin",
		creator_label: name => `Creator: ${name}`,
		creator_profile_missing: "Creator’s profile is missing",
		main_language: "Main language",
		main_language_missing: "Word set’s source language is missing",
		save: "Save",
		unsave: "Unsave",
	},
	creator: {
		title: name => `Word sets by ${name}`,
		title_me: "My word sets",
	},
	learn: {
		title: name => `Learn - ${name}`,
		speak: "Speak",
		previous: "Previous",
		next: "Next",
		flip: "Flip",
		progress: "Learning progress",
	},
	test: {
		title: name => `Test - ${name}`,
		show_answer: "Show answer",
		next: "Next",
		finish: "Finish",
		progress: "Test progress",
	},
	editor: {
		title: {
			edit: name => `Edit - ${name}`,
			unsaved: name => `Unsaved - ${name}`
		},
		save: "Save",
		saving: "Saving",
		saved: "Saved",
		you_have_unsaved_changes: "You have unsaved changes, are you sure you want to leave?",
		fork: {
			_: "Fork",
			success: "Forked successfully",
		},
		export: "Export",
		import: {
			_: "Import...",
			win: "Words imported successfully.",
			bad_file_error: "The words is corrupted. Please check the console for error details.",
		},
		delete: "Delete...",
		deleting: "Deleting",
		delete_confirm: {
			this_will_be_deleted: "This set will be deleted:",
			are_you_sure: "Are you sure?",
		},
		rename: "Rename...",
		renaming: "Renaming",
		new_name: "New name",
		word: "Word",
		meaning: "Meaning",
		type: "Type",
		extra: "Extra",
		add_a_word: "Add a word",
		move_up: "Move up",
		move_down: "Move down",
		insert_here: "Insert here",
		card_type_select_label: i => `Type for card number ${i}`,
		initialise: "Initialise...",
		initialisation: {
			_: "Initialisation",
			word_count: "Word count",
			create_blank: {
				_: n => `Create ${n} blank word${n > 1 ? "s" : ""}`,
				tip: "This will delete all existing words.",
			},
			word_language: "Word language",
			set_all_languages: {
				_: "Set all words' languages",
				tip: "This will delete all the language-feature-related information in each word but retain the word itself and its meaning. For example, French noun's gender will be deleted.",
			},
			create_and_set_languages: "Create, and then set languages"
		},
		view: {
			_: "View",
			word_operations: "Word operations",
			extra_options: "Extra options",
		},
		hieroglyphs_editor: {
			ime_buffer: "IME Buffer",
			move_cursor_left: "Move cursor left",
			move_cursor_right: "Move cursor right",
			backspace: "Backspace",
			make_ligature: "Make ligature",
			ungroup: "Ungroup",
			join_horizontally: "Join horizontally",
			join_vertically: "Join vertically",
			join_2: "Join two glyphs",
			join_3: "Join three glyphs",
			join_4: "Join four glyphs",
			syntax_error: "Syntax error",
		},
		furigana_editor: {
			merge_into_above: "Merge into above",
			merge_into_below: "Merge into below",
			split: "Split",
		},
	},
	WordType: {
		Simple: "Simple",
		English: "English",
		Mandarin: "Mandarin",
		Japanese: "Japanese",
		French: "French",
		German: "German",
		Egyptian: "Egyptian",
	},
	linguistics: {
		noun: "Noun",
		gender: "Gender",
		masculine: "Masculine",
		feminine: "Feminine",
		neutral: "Neutral",
		verb: "Verb",
		verb_group: "Verb group",
		pinyin: "Pinyin",
		bopomofo: "Bopomofo",
		transliteration: "Transliteration",
		abbr: {
			masculine: "m.",
			feminine: "f.",
			neutral: "n.",
		},
	},
	mandarin: {
		region: {
			prc: "China, People's Republic of",
			roc: "China, Republic of",
		}
	},
	english: {
		region: {
			gb: "Great Britain",
			us: "United States",
		}
	},
	japanese: {
		furigana: "Furigana",
	},
	egyptian: {
		identity: "Identity",
		egyptology: "Egyptology",
		transliteration: {
			gardiner: "Gardiner",
		},
		typewriter: {
			title: "Egyptian Hieroglyphs Typewriter",
			height: "Height",
			enable_custom_text_colour: "Enable custom text colour",
			custom_text_colour: "Custom text colour",
			hide_cursor: "Hide cursor",
			hide_input_border: "Hide input border",
			hide_controls: "Hide controls",
		},
	},
	stack: {
		vertical: "Vertical",
		horizontal: "Horizontal",
		split: "Split",
	},
	error: {
		code: "Error code",
		auth: {
			_: "Authentication error",
		},
	},
	language: {
		[Language.ZhCn]: "Chinese (Mainland)",
		[Language.ZhTw]: "Chinese (Taiwan)",
		[Language.EnGb]: "English (UK)",
		[Language.EnUs]: "English (US)",
		[Language.JaJp]: "Japanese",
		[Language.FrFr]: "French (France)",
		[Language.DeDe]: "German (Germany)",
		[Language.Egy]: "Egyptian",
	},
	not_by_ai: {
		developer: "Developed by humans, not by AI.",
	}
}

export default EnGb
