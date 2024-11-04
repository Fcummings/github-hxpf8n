import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  return (
    <a href={href} onClick={onClick} className="nav-link">
      {children}
    </a>
  );
};

export default NavLink;