import type { PageServerLoad } from './$types';
import { getSlotSchemas, getLiveAssignments } from '$lib/cms/slots';

export interface CurrentImageSet {
  section: string;
  description: string;
  images: string[];
}

export const load: PageServerLoad = async () => {
  const schemas = getSlotSchemas();
  const live = getLiveAssignments();

  const currentImageSets: CurrentImageSet[] = Object.entries(schemas).map(([slotId, schema]) => ({
    section: schema.label,
    description: schema.description,
    images: live[slotId] || []
  }));

  return {
    currentImageSets
  };
};
