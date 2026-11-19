import { ixPath } from "@ix/lib/ix-path";

const footer: { title: string; href: string }[] = [
  {
    title: "Resume",
    href: ixPath("/resume"),
  },
  {
    title: "Contact",
    href: ixPath("/#contact"),
  },
];

export { footer };
