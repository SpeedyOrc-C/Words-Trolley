import {goto} from '$app/navigation'

export async function load({parent})
{
   const {user, profile} = await parent()

   if (profile == null || user == null)
   {
      await goto('/auth')
      return
   }

   return {user, profile}
}
