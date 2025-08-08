import { VisualEditing } from "@sanity/visual-editing/remix";
import { DisablePreviewMode } from "./DisablePreviewMode";

export default function SanityVisualEditing() {
  return (
    <>
      <VisualEditing />
      <DisablePreviewMode />
    </>
  );
}