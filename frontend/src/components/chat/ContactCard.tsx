import Avatar from "@/components/ui/Avatar";
import { TContactCardProps } from "@/types/Chat.types";

const ContactCard = ({ pic, name }: TContactCardProps) => {
  return (
    <article className="flex flex-row mt-5 items-center">
      <Avatar pic={pic} sizeClass="w-10 mr-3" />
      <figcaption>{name}</figcaption>
    </article>
  );
};

export default ContactCard;
