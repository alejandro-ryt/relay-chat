import { AvatarProps } from "@/types/Chat.types";

const Avatar = ({ pic, sizeClass }: AvatarProps) => {
  return (
    <article className="avatar">
      <figure className={`mask mask-squircle ${sizeClass}`}>
        <img loading="lazy" src={pic} />
      </figure>
    </article>
  );
};

export default Avatar;
