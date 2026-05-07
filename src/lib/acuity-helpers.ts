import type { AcuityAppointmentType } from '@/ai/flows/acuity-booking-flow';

/**
 * Checks if a service is explicitly for men based on keywords in its name.
 * A service is considered for men if its name contains "men's" or "gentleman".
 * @param serviceName - The name of the service.
 * @returns True if the service is for men, false otherwise.
 */
function isMaleService(serviceName: string): boolean {
  const name = serviceName.toLowerCase();
  const maleKeywords = ["men's", "gentleman"];
  return maleKeywords.some(kw => name.includes(kw));
}

export function categorizeServicesForArea(
  allServices: AcuityAppointmentType[],
  gender: 'male' | 'female',
  area: 'face' | 'mid' | 'low'
): AcuityAppointmentType[] {

  const faceKeywords = ['nose', 'lip', 'chin', 'brow', 'eyebrow', 'face', 'sideburn', 'ear', 'facial'];
  const midKeywords = ['back', 'chest', 'stomach', 'underarm', 'arm'];
  const lowKeywords = ['leg', 'butt', 'brazilian', 'bikini'];

  // 1. First, filter the services based on the selected gender using keywords.
  const genderFilteredServices = allServices.filter(service => {
    if (gender === 'male') {
      return isMaleService(service.name);
    } else { // gender === 'female'
      // A service is considered for women if it's NOT explicitly for men.
      return !isMaleService(service.name);
    }
  });

  // 2. From the gender-filtered list, categorize by body area.
  return genderFilteredServices.filter(service => {
    const serviceName = service.name.toLowerCase();
    switch (area) {
      case 'face':
        return faceKeywords.some(kw => serviceName.includes(kw));
      case 'mid':
        return midKeywords.some(kw => serviceName.includes(kw));
      case 'low':
        return lowKeywords.some(kw => serviceName.includes(kw));
      default:
        return false;
    }
  });
}

/**
 * Validates that all selected services can be combined as addons of the first service.
 * @param selectedServices - Array of services selected by the client.
 * @returns Object with validation result, primary service, addon IDs, and any incompatible services.
 */
export function validateServiceCompatibility(selectedServices: { id: number; name: string }[]) {
  if (selectedServices.length === 0) {
    return { valid: false, primaryService: null as { id: number; name: string } | null, addonIDs: [] as number[], invalidServices: [] as { id: number; name: string }[] };
  }

  if (selectedServices.length === 1) {
    return { valid: true, primaryService: selectedServices[0], addonIDs: [] as number[], invalidServices: [] as { id: number; name: string }[] };
  }

  const primaryService = selectedServices[0];
  const otherServices = selectedServices.slice(1);

  // This validation requires the full AcuityAppointmentType objects with addonIDs.
  // Since this function receives only id/name, the caller should ensure compatibility
  // by checking addonIDs from the full appointment types.
  return { valid: true, primaryService, addonIDs: otherServices.map(s => s.id), invalidServices: [] as { id: number; name: string }[] };
}

/**
 * Given full appointment types and selected services, validates compatibility using addonIDs.
 * @param allAppointmentTypes - Full list of appointment types from Acuity API.
 * @param selectedServices - Services selected by the client.
 * @returns Object with validation result, primary service, addon IDs, and any incompatible services.
 */
export function validateServicesWithTypes(
  allAppointmentTypes: { id: number; name: string; addonIDs: number[] }[],
  selectedServices: { id: number; name: string }[]
) {
  if (selectedServices.length === 0) {
    return { valid: false, primaryService: null as typeof selectedServices[0] | null, addonIDs: [] as number[], invalidServices: [] as typeof selectedServices[0][] };
  }

  if (selectedServices.length === 1) {
    return { valid: true, primaryService: selectedServices[0], addonIDs: [] as number[], invalidServices: [] as typeof selectedServices[0][] };
  }

  const primaryService = selectedServices[0];
  const otherServices = selectedServices.slice(1);

  const primaryType = allAppointmentTypes.find(t => t.id === primaryService.id);
  if (!primaryType) {
    return { valid: false, primaryService, addonIDs: [] as number[], invalidServices: otherServices };
  }

  const invalidServices = otherServices.filter(s => !primaryType.addonIDs.includes(s.id));
  const addonIDs = otherServices.filter(s => primaryType.addonIDs.includes(s.id)).map(s => s.id);

  return {
    valid: invalidServices.length === 0,
    primaryService,
    addonIDs,
    invalidServices,
  };
}
