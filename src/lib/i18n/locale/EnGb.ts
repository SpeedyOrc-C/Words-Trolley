import type {I18nTemplate} from "$lib/i18n/I18nTemplate"

const EnGb: I18nTemplate = {
	hello: "Hello!",
	login: "Log in",
	signup: "Sign up",
	login_and_signup: "Log in / Sign up",
	logout: "Log out",
	email: "Email",
	password: "Password",
	submit: "Submit",
	name: "Name",
	edit: "Edit",
	delete: "Delete",
	insert: "Insert",
	close: "Close",
	more: "More",
	settings: {
		_: "Settings",
		follows_your_system: "Follows your system",
		ui_language: "UI Language",
		mandarin_script: "Mandarin Script",
	},
	home: {
		_: "Home",
		welcome_to_words_trolley: "Welcome to Words Trolley",
		welcome_back: "Welcome back",
		create_a_new_set: "Create a new set",
		browse_my_sets: "Browse my sets",
	},
	new: {
		_: "Create",
		create_a_new_set_of_words: "Create a new set of words...",
	},
	set: {
		learn: "Learn",
		test: "Test"
	},
	test: {
		show_answer: "Show answer",
		next: "Next",
		finish: "Finish"
	},
	editor: {
		title: {
			edit: name => `Edit - ${name}`,
			unsaved: name => `Unsaved - ${name}`
		},
		save: "Save",
		saving: "Saving",
		saved: "Saved",
		export: "Export",
		import: "Import...",
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
		card_type_select_label: i => `Type for card number ${i}`
	},
	Card: {
		Simple: "Simple",
		Mandarin: "Mandarin",
		Japanese: "Japanese",
		French: "French",
		German: "German",
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
	}
}

export default EnGb
