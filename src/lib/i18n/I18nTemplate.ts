export type I18nTemplate = {
    hello: string
    login: string
    signup: string
    login_and_signup: string
    logout: string
    email: string
    password: string
    submit: string
    name: string
    edit: string
    delete: string
    insert: string
    home: {
        _: string
        welcome_to_words_trolley: string
        welcome_back: string
        create_a_new_set: string
        browse_my_sets: string
    }
    new: {
        create_a_new_set_of_words: string
    }
    editor: {
        title: {
            edit: (name: string) => string
            unsaved: (name: string) => string
        }
        save: string
        saving: string
        saved: string
        edit_less: string
        edit_more: string
        export: string
        import: string
        importing: string
        delete: string
        deleting: string
        delete_confirm: {
            this_will_be_deleted: string
            are_you_sure: string
        }
        rename: string
        renaming: string
        new_name: string
        operations: string
        word: string
        meaning: string
        type: string
        extra: string
        add_a_word: string
        move_up: string
        move_down: string
    }
    CardType: {
        Simple: string
        Mandarin: string
        Japanese: string
        JapaneseVerb: string
        FrenchNoun: string
        GermanNoun: string
    }
    linguistics: {
        gender: string
        masculine: string
        feminine: string
        neutral: string
        abbr: {
            masculine: string
            feminine: string
            neutral: string
        }
    }
}
