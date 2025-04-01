interface AvatarProps {
  pic: string;
  sizeClass: string;
}

const Avatar = ({ pic, sizeClass }: AvatarProps) => {
  return (
    <article className="avatar">
      <figure className={`mask mask-squircle ${sizeClass}`}>
        <img src={pic} />
      </figure>
    </article>
  );
};

export default Avatar;
