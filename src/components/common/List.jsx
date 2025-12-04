import Link from "next/link";
import Image from "next/image";

export default function List ({ items }) {
    return (
        <ul>
            {items.map(({category, tit, src, alt, href, date},i)=> (
                <li key={i}>
                    <Link href={href ?? ""}>
                        {category &&<strong>{category}</strong>}
                        {tit &&<p>{tit}</p>}
                        {date &&<small className="color_lightGray">{date}</small>}
                        {src && alt && <Image src={src} alt={alt} fill />}
                    </Link>
                </li>
            ))}
        </ul>
    );
}