import { TAvatarProps } from "@/types/chat.types";

const Avatar = ({ pic, sizeClass }: TAvatarProps) => {
  return (
    <article className="avatar">
      <figure className={`mask mask-squircle ${sizeClass}`}>
        <img loading="lazy" src={pic} />
      </figure>
    </article>
  );
};

export default Avatar;
