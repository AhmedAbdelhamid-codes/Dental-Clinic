import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase(
    { auth: ["publishable"] },
    async (req, ctx) => {

      const {data: { user } ,error} = await ctx.supabase.auth.getUser();

      if (error || !user) {
        return Response.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }

      const { data: staff, error: staffError } =
        await ctx.supabase.from('staff').select('role').eq('id', user.id).single();

      if (staffError || !staff) {
        return Response.json(
          { error: "Staff record not found" },
          { status: 404 }
        );
      }

      if (staff.role !== 'doctor') {
        return Response.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }

      return Response.json({
        message: "You are authorized",
        userId: user.id,
        role: staff.role
      });

      const { email, password, name, role, title } = await req.json();
   

      if (!email || !password || !name || !role || !title) {
        return Response.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      if (role !== "doctor" && role !== "assistant") {
        return Response.json(
          { error: "Invalid role" },
          { status: 400 }
        );
       }

      const { data: newUser, error: createUserError } =
       await ctx.supabaseAdmin.auth.admin.createUser({
       email,
       password,
       email_confirm: true
      });

      if (createUserError || !newUser.user) {
      return Response.json(
       { error: createUserError?.message ?? "Failed to create user" },
       { status: 400 });
        }

        const { error: staffInsertError } =
          await ctx.supabaseAdmin.from('staff').insert({
          id: newUser.user.id,
          name,
          role,
          title
         });

         if (staffInsertError) {

         await ctx.supabaseAdmin.auth.admin.deleteUser(newUser.user.id);

         return Response.json(
           { error: staffInsertError.message },
           { status: 400 }
        );

        return Response.json({
         message: "Staff created successfully",
         staffId: newUser.user.id
         });
       }
    }
  ),
};