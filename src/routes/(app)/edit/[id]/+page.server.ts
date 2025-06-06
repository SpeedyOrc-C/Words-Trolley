import * as kit from "@sveltejs/kit"

export async function load({locals: {supabase}, params: {id}, depends})
{
    depends("supabase:db:sets")

    const {data, error} = await supabase.from("sets").select("*").eq("id", id)

    if (error != null)
        kit.error(404)

    const set = data[0]

    return {set}
}
