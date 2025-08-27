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
	word_set: "Word set",
	goto: "Go to",
	settings: {
		_: "Settings",
		follows_your_system: "Follows your system",
		ui_language: "UI Language",
		mandarin_script: "Mandarin Script",
		customise_voices: {
			_: "Customise voices",
			tip: "Tick the languages you want to change the voice for.",
		},
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
		test: "Test",
		origin: "Origin",
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
	},
	WordType: {
		Simple: "Simple",
		English: "English",
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
	},
	english: {
		region: {
			gb: "Great Britain",
			us: "United States",
		}
	}
}

export default EnGb
