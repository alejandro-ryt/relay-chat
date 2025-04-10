import { TAvatarProps } from "@/types/chat.types";

const Avatar = ({ pic, sizeClass }: TAvatarProps) => {
  return pic ? (
    <article className="avatar">
      <figure className={`mask bg-base-content mask-squircle ${sizeClass}`}>
        <img className="object-contain" loading="lazy" src={pic} />
      </figure>
    </article>
  ) : (
    <div className="avatar avatar-placeholder mask mask-squircle">
      <div className="bg-neutral text-neutral-content w-16">
        <span className="text">D</span>
      </div>
    </div>
  );
};

export default Avatar;
