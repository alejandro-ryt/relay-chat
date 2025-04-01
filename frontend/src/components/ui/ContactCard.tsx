import Avatar from "@/components/ui/Avatar";

interface ContactCardProps {
  pic: string;
  name: string;
}

const ContactCard = ({ pic, name }: ContactCardProps) => {
  return (
    <article className="flex flex-row mt-5 items-center">
      <Avatar pic={pic} sizeClass="w-10 mr-3" />
      <figcaption>{name}</figcaption>
    </article>
  );
};

export default ContactCard;
