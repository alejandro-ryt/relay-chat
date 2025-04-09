import { CONTACT_DATA } from "@/constants/contact";
import SadIcon from "@/components/ui/icons/SadIcon";

export const EmptyContact = () => {
  return (
    <section className="hero bg-base-200 flex-1 items-center justify-center">
      <div role="group" className="hero-content text-center">
        <div role="banner" className="max-w-md flex items-center flex-col">
          <h2 className="text-5xl text-center font-bold">
            {CONTACT_DATA.EMPTY_CONTACTS}
          </h2>
          <p className="py-6">{CONTACT_DATA.ADD_CONTACTS}</p>
          <SadIcon />
        </div>
      </div>
    </section>
  );
};
export default EmptyContact;
