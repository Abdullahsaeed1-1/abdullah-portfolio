export interface SiteAuthor {
  readonly name: string;
  readonly role: string;
  readonly location: string;
}

export interface SiteLinks {
  readonly canonical: string;
  readonly github: string;
  readonly linkedin: string;
  readonly resume: string;
}

export interface SiteContact {
  readonly email: string;
  readonly responseTime: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly locale: string;
  readonly author: SiteAuthor;
  readonly links: SiteLinks;
  readonly contact: SiteContact;
}
