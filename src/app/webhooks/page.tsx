import { PageHeader } from "@/components/PageHeader";
import { StickyTopBox } from "@/components/StickyPageHeader";

export default function WebhooksPage() {
  return (
    <StickyTopBox>
      <PageHeader title="Webhooks" backPath="/" />
    </StickyTopBox>
  );
}
