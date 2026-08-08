export const socialLinks = {
  facebook: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  whatsappNumber: "",
};

export const verifiedSocialLinks = Object.entries(socialLinks)
  .filter(([, value]) => Boolean(value))
  .map(([network, url]) => ({ network, url }));
