import { Link } from "@/types";

const links: Link[] = [
  {
    title: 'Home',
    href: '/',
    thumbnail: '/assets/nav-previews/{theme}/home.jpg'
  },
  {
    title: 'Experience',
    href: '/#experience',
    thumbnail: '/assets/nav-previews/{theme}/experience.jpg'
  },
  {
    title: 'Skills',
    href: '/#skills',
    thumbnail: '/assets/nav-previews/{theme}/skills.jpg'
  },
  {
    title: 'Projects',
    href: '/#projects',
    thumbnail: '/assets/nav-previews/{theme}/projects.jpg'
  },
  {
    title: 'GitHub',
    href: '/#github',
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
    href: '/resume',
    thumbnail: '/assets/nav-previews/{theme}/resume.jpg',
  },
  {
    title: 'Contact',
    href: '/#contact',
    thumbnail: '/assets/nav-previews/{theme}/contact.jpg'
  }
];

export { links };
