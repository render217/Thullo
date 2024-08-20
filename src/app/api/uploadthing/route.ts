import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { UTApi } from "uploadthing/server";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

export async function DELETE(request: Request) {
  const data = await request.json();
  const newUrl = data.url.substring(data.url.lastIndexOf("/") + 1);
  console.log({ deleteKey: newUrl });
  const utapi = new UTApi();
  const result = await utapi.deleteFiles(newUrl);
  console.log(result);
  return Response.json({ message: "ok" });
}
