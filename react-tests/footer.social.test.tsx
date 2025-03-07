// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Footer from '../src/components/landing/components/footer/components/footer-info';
// import '@testing-library/jest-dom';

// describe('Footer Component', () => {
//     it('renders the footer component without crashing', () => {
//         render(<Footer />);
//         expect(screen.getByText('© 2024 EquiSpace. All Rights Reserved.')).toBeInTheDocument();
//     });

//     it('renders all social icons with correct links and titles', () => {
//         render(<Footer />);

//         const socialLinks = [
//             { name: 'Twitter Icon', href: 'https://twitter.com' },
//             { name: 'Gmail Icon', href: 'mailto:joshua.varney1@gmail.com' },
//             { name: 'Facebook Icon', href: 'https://facebook.com' },
//             { name: 'Instagram Icon', href: 'https://instagram.com' },
//         ];

//         socialLinks.forEach(({ name, href }) => {
//             const link = screen.getByLabelText(name);
//             expect(link).toBeInTheDocument();
//             expect(link).toHaveAttribute('href', href);
//         });
//     });

//     it('checks the number of social icons', () => {
//         render(<Footer />);
//         const links = screen.getAllByRole('link', { name: /icon/i });
//         expect(links).toHaveLength(4); // Ensure 4 social icons are present
//     });

//     it('renders Privacy Policy and Terms of Service links', () => {
//         render(<Footer />);

//         const privacyPolicyLink = screen.getByText('Privacy Policy');
//         const termsOfServiceLink = screen.getByText('Terms of Service');

//         expect(privacyPolicyLink).toBeInTheDocument();
//         expect(privacyPolicyLink).toHaveAttribute('href', '/policy/privacy-policy');

//         expect(termsOfServiceLink).toBeInTheDocument();
//         expect(termsOfServiceLink).toHaveAttribute('href', '/policy/t&c-policy');
//     });

//     it('checks that the social icons have hover styles', () => {
//         render(<Footer />);

//         const twitterIcon = screen.getByLabelText('Twitter Icon');
//         const facebookIcon = screen.getByLabelText('Facebook Icon');

//         expect(twitterIcon).toHaveClass('hover:text-teal-500');
//         expect(facebookIcon).toHaveClass('hover:text-teal-500');
//     });

//     it('ensures the footer has accessible attributes for links', () => {
//         render(<Footer />);
//         const links = screen.getAllByRole('link');

//         links.forEach((link) => {
//             expect(link).toHaveAttribute('aria-label'); // Check for accessibility labels
//             expect(link).toHaveAttribute('href'); // Ensure each link has an href
//         });
//     });

//     it('renders with appropriate semantic structure', () => {
//         render(<Footer />);
//         const footerDiv = screen.getByRole('contentinfo');
//         expect(footerDiv).toBeInTheDocument();
//     });

//     it('checks responsiveness of the footer', () => {
//         render(<Footer />);
        
//         // Select the main footer container by role or a known property
//         const container = screen.getByRole('contentinfo'); // The footer element
    
//         // Check for responsiveness classes
//         expect(container).toHaveClass('flex'); // Base flex layout
//         expect(container).toHaveClass('sm:flex-row'); // Responsive class for small screens
//     });

//     it('matches the snapshot', () => {
//         const { asFragment } = render(<Footer />);
//         expect(asFragment()).toMatchSnapshot();
//     });
// });
