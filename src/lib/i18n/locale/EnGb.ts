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
    home: {
        _: "Home",
        welcome_to_words_trolley: "Welcome to Words Trolley",
        welcome_back: "Welcome back",
        create_a_new_set: "Create a new set",
        browse_my_sets: "Browse my sets",
    },
    new: {
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
    CardType: {
        Simple: "Simple",
        Mandarin: "Mandarin",
        Japanese: "Japanese",
        JapaneseVerb: "Japanese Verb",
        FrenchNoun: "French Noun",
        GermanNoun: "German Noun",
    },
    linguistics: {
        gender: "Gender",
        masculine: "Masculine",
        feminine: "Feminine",
        neutral: "Neutral",
        verb_group: "Verb group",
        pinyin: "Pinyin",
        abbr: {
            masculine: "m.",
            feminine: "f.",
            neutral: "n.",
        },
    }
}

export default EnGb
