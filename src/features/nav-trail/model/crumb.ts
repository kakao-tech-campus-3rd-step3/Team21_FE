export type Crumb = { label: string; href?: string };

export type BuildArgs = {
  univ?: { id: string; name: string };
  college?: { id: string; name: string };
  dept?: { id: string; name: string };
  prof?: { id: string; name: string };
};
