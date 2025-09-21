import { SuccessPageContent } from "@/components/success-page-content";
import { redirect } from "next/navigation";
import { stackServerApp } from "../../stack";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  const sessionId = searchParams.session_id;
  const sessionLabel = sessionId
    ? sessionId.slice(-8)
    : "e4fb316d-ff45-4081-83a7-8690507d2a4a_j47wpt856t9yepaa6wg12aexdmyk2yx26rxnay31wr6bbf0";

  return (
    <SuccessPageContent
      sessionLabel={sessionLabel}
      userName={user.displayName ?? null}
      userEmail={user.primaryEmail ?? null}
    />
  );
}
