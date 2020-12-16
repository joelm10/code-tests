/**
 * Simple config ruleset
 */
export const rules = {
    reject: {
        label: 'Rejected',
        desc: 'Parcel Rejected due to over max weight',
        sizes: ['Oversize']
    },
    accept: {
        label: 'Accepted',
        desc: 'Parcel Accepted',
        sizes:
            [
                'Heavy Parcel',
                'Small Parcel',
                'Medium Parcel',
                'Large Parcel',
            ],
    }
};

/**
 * Abstract cost rule-sets to config for extensibility
 * // Future TODO: extricate to allow simpler iteration
 */
export const costRules = [
    // Reject
    {
        label: rules.reject,
        priority: 1,
        minWeight: 50,
        maxWeight: 49,
        volume: null,
        costTrigger: null,
        costUnit: null,
        costMultiplier: null,
    },
    // Heavy
    {
        label: rules.accept.label,
        size: rules.accept.sizes[0],
        priority: 2,
        minWeight: 11,
        maxWeight: 49,
        volume: null,
        costTrigger: 'weight',
        costUnit: 'kg',
        costMultiplier: 15,
    },
    // Small
    {
        label: rules.accept.label,
        size: rules.accept.sizes[1],
        priority: 3,
        minWeight: 1,
        maxWeight: 11,
        maxVol: 1500,
        minVol: 1,
        // Bus rule set
        costTrigger: 'volume',
        costUnit: 1,
        costMultiplier: 0.05
    },
    // Medium
    {
        label: rules.accept.label,
        size: rules.accept.sizes[2],
        priority: 4,
        minWeight: 1,
        maxWeight: 11,
        maxVol: 2499,
        minVol: 1501,
        // Bus rule set
        costTrigger: 'volume',
        costUnit: 1,
        costMultiplier: 0.04
    },
    // Large
    {
        label: rules.accept.label,
        size: rules.accept.sizes[3],
        priority: 5,
        minWeight: null,
        maxWeight: null,
        maxVol: null,
        minVol: null,
        // Bus rule set
        costTrigger: 'volume',
        costUnit: 1,
        costMultiplier: 0.03
    }
];