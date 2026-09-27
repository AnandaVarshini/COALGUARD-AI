export const DGMS_REGULATIONS = {
  gasThresholds: {
    ch4: {
      standardPermissible: 0.5,
      alarmLevel: 0.8,
      evacuateLevel: 1.25,
      unit: '% by volume in air',
      regulationRef: 'CMR 2017 Regulation 153',
      description: 'Flammable gas safety limit for electrical apparatus cutout'
    },
    co: {
      standardPermissible: 10,
      alarmLevel: 25,
      evacuateLevel: 50,
      unit: 'ppm',
      regulationRef: 'CMR 2017 Regulation 156',
      description: 'Carbon monoxide threshold limit value (TLV-TWA 8 hours)'
    },
    o2: {
      standardPermissible: 19.0,
      minPermissible: 19.0,
      unit: '% by volume in air',
      regulationRef: 'CMR 2017 Regulation 151',
      description: 'Minimum oxygen level required in working mine atmosphere'
    },
    pm10: {
      standardPermissible: 100,
      alarmLevel: 150,
      unit: 'µg/m³',
      regulationRef: 'CPCB & DGMS Dust Control Circular 2019',
      description: 'Airborne respirable coal dust standard on haul roads and face'
    }
  },
  slopeStability: {
    maxTiltVelocity: 1.0, // mm/hour
    criticalWarningVelocity: 2.5,
    benchHeightLimit: 15.0, // meters
    benchSlopeAngleMax: 45.0, // degrees
    overallPitSlopeAngleMax: 38.0,
    regulationRef: 'DGMS Geotechnical Circular No. 04 of 2019',
    description: 'Highwall and dump slope failure prevention via real-time SSR (Slope Stability Radar)'
  },
  blastingProtocol: {
    dangerZoneRadiusMeters: 500,
    sirenIntervalSeconds: 180,
    sentriesRequiredPerRoad: 2,
    flyRockProximityBufferMeters: 300,
    regulationRef: 'CMR 2017 Regulation 186',
    description: 'Statutory opencast deep-hole blasting danger perimeter clearance'
  },
  shiftFatigueLimits: {
    maxShiftHours: 8,
    mandatoryRestHours: 16,
    maxConsecutiveShifts: 6,
    regulationRef: 'Mines Act 1952 Chapter VI (Hours and Limitation of Employment)'
  }
};
