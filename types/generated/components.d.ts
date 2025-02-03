import type { Schema, Struct } from '@strapi/strapi';

export interface AtomsFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_atoms_footer_links';
  info: {
    displayName: 'Footer_link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface AtomsLogoElement extends Struct.ComponentSchema {
  collectionName: 'components_atoms_logo_elements';
  info: {
    description: '';
    displayName: 'Logo_element';
    icon: 'picture';
  };
  attributes: {
    alt: Schema.Attribute.String;
    link: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images' | 'files', true>;
    mobile: Schema.Attribute.Media<'images' | 'files', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'atoms.footer-link': AtomsFooterLink;
      'atoms.logo-element': AtomsLogoElement;
    }
  }
}
