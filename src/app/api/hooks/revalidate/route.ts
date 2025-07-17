import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import envConfig from "@/config";

// Ensure you have set SANITY_WEBHOOK_SECRET in your .env
const SECRET = envConfig.SANITY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  // Read signature header and raw body for validation
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const bodyText = await request.text();

  if (!SECRET || !signature || !isValidSignature(bodyText, signature, SECRET)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  // Parse the webhook payload
  const payload = JSON.parse(bodyText);

  // Determine the path to revalidate (adjust according to your payload shape)
  const slug = payload.slug?.current || payload.documentId;
  const pathToRevalidate = slug.startsWith("/") ? slug : `/${slug}`;

  // Trigger Next.js to revalidate the page at this path
  revalidatePath(pathToRevalidate);

  return NextResponse.json({ revalidated: true, path: pathToRevalidate });
}
