import store from '../../../content/store/live.json';

interface SiteConfig {
  businessName: string;
  phone: string;
  phoneTel: string;
  email: string;
  address: string;
  suburb: string;
  city: string;
  postcode: string;
  country: string;
  fullAddress: string;
  openingHours: string;
  googleMapsUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  cognitoFormId: string;
  cognitoMessageFormId: string;
  cognitoDataKey: string;
  googleReviewRating: number;
  googleReviewCount: number;
}

const phoneTel = store.phone.replace(/[^0-9+]/g, '');

export const site: SiteConfig = {
  ...store,
  phoneTel,
  fullAddress: `${store.address}, ${store.suburb}, ${store.city} ${store.postcode}`
};
