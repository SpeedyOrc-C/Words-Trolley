import * as kit from "@sveltejs/kit"

export async function load({locals: {supabase}, params: {id}})
{
    const {data: sets, error} = await supabase.from("sets").select("id,name").eq("creator", id)

    if (sets == null || error != null)
        kit.error(404)

    return {sets, creator: id}
}
