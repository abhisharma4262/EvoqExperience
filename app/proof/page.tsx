import { redirect } from "next/navigation";

/** Legacy route — client stories now live on the home film. */
export default function ProofPage() {
  redirect("/#section-stories");
}
