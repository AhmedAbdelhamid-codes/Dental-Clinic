import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export default {
  fetch: withSupabase(
    { auth: ["user"] },
    async (req, ctx) => {

      if (req.method === "OPTIONS") {
        return new Response("ok", {
          headers: corsHeaders,
        });
      }

      const {data: { user },error,} = await ctx.supabase.auth.getUser();

      if (error || !user) {
        return Response.json(
          { error: "Unauthorized" },
          {
            status: 401,
            headers: corsHeaders,
          }
        );
      }

      const { data: staff, error: staffError } =
        await ctx.supabase.from("staff").select("role").eq("id", user.id).single();

      if (staffError || !staff) {
        return Response.json(
          { error: "Staff record not found" },
          {
            status: 404,
            headers: corsHeaders,
          }
        );
      }

      if (staff.role !== "doctor") {
        return Response.json(
          { error: "Forbidden" },
          {
            status: 403,
            headers: corsHeaders,
          }
        );
      }

      const {email,password,name,role,tittle} = await req.json();

      if (!email || !password || !name || !role || !tittle) {
        return Response.json(
          { error: "Missing required fields" },
          {
            status: 400,
            headers: corsHeaders,
          }
        );
      }

      if (role !== "doctor" && role !== "assistant") {
        return Response.json(
          { error: "Invalid role" },
          {
            status: 400,
            headers: corsHeaders,
          }
        );
      }

      const {data: newUser,error: createUserError,} =
        await ctx.supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

      if (createUserError || !newUser.user) {
        return Response.json(
          {
            error:
              createUserError?.message ??
              "Failed to create user",
          },
          {
            status: 400,
            headers: corsHeaders,
          }
        );
      }

      const { error: staffInsertError } =
        await ctx.supabaseAdmin.from("staff").insert({
            id: newUser.user.id,
            name,
            role,
            tittle,
          });

      if (staffInsertError) {

        await ctx.supabaseAdmin.auth.admin.deleteUser(
          newUser.user.id
        );

        return Response.json(
          { error: staffInsertError.message },
          {
            status: 400,
            headers: corsHeaders,
          }
        );
      }

      return Response.json(
        {
          message: "Staff created successfully",
          staffId: newUser.user.id,
        },
        {
          status: 200,
          headers: corsHeaders,
        }
      );
    }
  ),
};