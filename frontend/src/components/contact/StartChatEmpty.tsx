import { CONTACT_DATA } from "@/constants/contact";

export default () => (
  <section
    aria-label="Empty Start Area Placeholder Hero"
    className="size-full rounded-[1.5rem] bg-base-200"
  >
    <div
      role="group"
      className="size-full flex flex-col items-center justify-center"
    >
      <h2 className="text-3xl md:text-5xl py-5 font-bold">
        {CONTACT_DATA.START_CHAT}
      </h2>
      <p className="py-6">{CONTACT_DATA.START_CHAT_NEW}</p>
    </div>
  </section>
);
