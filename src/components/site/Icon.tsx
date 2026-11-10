type IconProps = {
  name: string;
};

export default function Icon({ name }: IconProps) {
  return (
    <svg className="icon" aria-hidden="true">
      <use href={`/assets/icons.svg#${name}`} />
    </svg>
  );
}
