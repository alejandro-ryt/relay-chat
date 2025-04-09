import { CONTACT_DATA } from "@/constants/contact";
import SadIcon from "@/components/ui/icons/SadIcon";

export const EmptyContact = () => {
  return (
    <section className="bg-base-200 flex flex-1 flex-col items-center justify-center">
      <h2 className="text-5xl text-center font-bold">
        {CONTACT_DATA.EMPTY_CONTACTS}
      </h2>
      <p className="py-6">{CONTACT_DATA.ADD_CONTACTS}</p>
      <SadIcon />
    </section>
  );
};
export default EmptyContact;
