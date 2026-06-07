import store from '../../../content/store/live.json';

interface BusinessHours {
  days: string[];
  opens: string;
  closes: string;
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

interface SiteConfig {
  businessName: string;
  alternateName: string;
  phone: string;
  phoneTel: string;
  email: string;
  address: string;
  suburb: string;
  city: string;
  postcode: string;
  country: string;
  foundingDate: string;
  shortDescription: string;
  fullAddress: string;
  openingHours: string;
  businessHours: BusinessHours[];
  geo: GeoCoordinates;
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
