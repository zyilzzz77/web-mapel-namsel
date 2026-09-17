import Image from "next/image";

export type MaterialCardProps = {
  index: string;
  label: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

export default function MaterialCard({
  index,
  label,
  title,
  body,
  image,
  imageAlt,
  imagePosition = "center",
}: MaterialCardProps) {
  return (
    <article className="material-card">
      <figure className="material-figure">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          style={{ objectPosition: imagePosition }}
        />
      </figure>
      <div className="material-body">
        <span>
          {index} / {label}
        </span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </article>
  );
}
