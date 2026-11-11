// Worker entry. wrangler.jsonc sends only /api/* here (run_worker_first);
// every other path is served straight from ./public by the static-assets layer.
import { handleContact } from "./contact.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact") {
      if (request.method === "POST") return handleContact(request, env);
      return new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });
    }
    return env.ASSETS.fetch(request);
  },
};
