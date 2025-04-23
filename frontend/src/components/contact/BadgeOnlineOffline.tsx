import clsx from "clsx";

export const BadgeOnlineOffline = ({ isOnline }: { isOnline: boolean }) => {
  return (
    <div
      className={clsx(
        "w-3 h-3 rounded-full absolute top-0 right-0 -mr-1 -mt-1",
        isOnline
          ? "bg-success border border-success"
          : "bg-base-100 border border-neutral"
      )}
    ></div>
  );
};
