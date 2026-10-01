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
          { status: 401, headers: corsHeaders }
        );
      }

      const { data: staff, error: staffError } =
        await ctx.supabase.from("staff").select("role").eq("id", user.id).single();

      if (staffError || !staff) {
        return Response.json(
          { error: "Staff record not found" },
          { status: 404, headers: corsHeaders }
        );
      }

      if (staff.role !== "doctor"){
        return Response.json(
          { error: "Forbidden"},
          { status: 403, headers: corsHeaders }
        );
      }

      const { userId } = await req.json();

      if (!userId) {
        return Response.json(
          { error: "User ID is required" },
          { status: 400, headers: corsHeaders }
        );
      }

      if (userId === user.id) {
        return Response.json(
          { error: "You cannot delete your own account" },
          { status: 400, headers: corsHeaders }
        );
      }

      const { error: deleteError } =
        await ctx.supabaseAdmin.auth.admin.deleteUser(userId);

      if (deleteError) {
        return Response.json(
          { error: deleteError.message },
          { status: 400, headers: corsHeaders }
        );
      }

      return Response.json(
        {
          message: "Staff deleted successfully",
        },
        {
          status: 200,
          headers: corsHeaders,
        }
      );
    }
  ),
};