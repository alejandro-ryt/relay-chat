import { ContactSkeletonProps } from "@/types/user.types";
import { FC, memo } from "react";

const ContactSkeleton: FC<ContactSkeletonProps> = memo(({ length = 1 }) => {
  const skeletonItem = (index: number) => (
    <section
      className="flex w-52 flex-col gap-4 py-4"
      key={`skeleton-${index}`}
    >
      <div role="group" className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-36"></div>
        </div>
      </div>
    </section>
  );
  return Array.from({ length }, (_, i) => skeletonItem(i));
});
export default ContactSkeleton;
