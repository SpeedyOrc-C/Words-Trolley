export default interface EditorNavProps
{
	online: boolean
	saving: boolean
	saved: boolean
	deleting: boolean
	renaming: boolean
	showWordOperations: boolean
	showExtraOptions: boolean
	OpenSettings: () => any
	OpenInitialisation: () => any
	Save: () => any
	Import: () => any
	Export: () => any
	Delete: () => any
	Rename: () => any
}
