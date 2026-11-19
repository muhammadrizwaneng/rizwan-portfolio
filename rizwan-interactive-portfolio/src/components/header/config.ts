import { Link } from "@ix/types";
import { ixPath } from "@ix/lib/ix-path";

const links: Link[] = [
  {
    title: 'Home',
    href: ixPath('/'),
    thumbnail: '/assets/nav-previews/{theme}/home.jpg'
  },
  {
    title: 'Experience',
    href: ixPath('/#experience'),
    thumbnail: '/assets/nav-previews/{theme}/experience.jpg'
  },
  {
    title: 'Skills',
    href: ixPath('/#skills'),
    thumbnail: '/assets/nav-previews/{theme}/skills.jpg'
  },
  {
    title: 'Projects',
    href: ixPath('/#projects'),
    thumbnail: '/assets/nav-previews/{theme}/projects.jpg'
  },
  {
    title: 'GitHub',
    href: ixPath('/#github'),
    thumbnail: '/assets/nav-previews/{theme}/projects.jpg'
  },
  // {
  //   title: 'Skills',
  //   href: '/skills',
  //   thumbnail: '/assets/nav-link-previews/skills.png'
  // },
  // {
  //   title: 'Testimonials',
  //   href: '/testimonials',
  //   thumbnail: '/assets/nav-link-previews/testimonials.png'
  // },
  {
    title: 'Resume',
    href: ixPath('/resume'),
    thumbnail: '/assets/nav-previews/{theme}/resume.jpg',
  },
  {
    title: 'Contact',
    href: ixPath('/#contact'),
    thumbnail: '/assets/nav-previews/{theme}/contact.jpg'
  }
];

export { links };
