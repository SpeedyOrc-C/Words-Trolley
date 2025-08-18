export default interface EditorNavProps
{
	online: boolean
	saving: boolean
	saved: boolean
	deleting: boolean
	OpenSettings: () => any
	OpenInitialisation: () => any
	Save: () => any
	Import: () => any
	Export: () => any
	Delete: () => any
}
