import { PageHeader } from "@/components/layout/PageHeader";
import { StickyTopBox } from "@/components/ui/StickyTopBox";

export default function WebhooksPage() {
  return (
    <StickyTopBox>
      <PageHeader title="Webhooks" backPath="/" />
    </StickyTopBox>
  );
}
