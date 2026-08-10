import { redirect } from "next/navigation";

/** Legacy route — client stories now live on Create / Transform / Operate. */
export default function ProofPage() {
  redirect("/#section-modes");
}
