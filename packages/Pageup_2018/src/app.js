import { costRules, rules } from './constants/index.js';

import utils from './utils/index.js';

/**
 * Get Delivery cost
 * NOTE: Assumes all units are in kg (weight), and cm (all others)
 * @param {int} weight 
 * @param {int} height 
 * @param {int} width 
 * @param {int} depth 
 */
const getDeliveryCost = (weight, height, width, depth) => {
    const parcel = {
        priority: null,
        cost: 'N/A',
        volume: 'Not Calculated',
        state: null,
        size: ''
    };

    // validate inputs
    const isValid = utils.checkInputs(weight, height, depth);
    if (!isValid) {
        utils.log('---- APP ERROR: In-valid inputs ---- \n\n\n');
        return false;
    }
    // check rulesets
    const isRejectedParcel = (weight > costRules[0].maxWeight);
    const isHeavyParcel = (!isRejectedParcel && weight >= costRules[1].minWeight);

    if (isRejectedParcel) {
        // Rejected parcels
        parcel.state = rules.reject.label;
        parcel.description = rules.reject.desc;
        parcel.priority = 1;
    } else if (isHeavyParcel) {
        // Heavy Parcel
        parcel.state = rules.accept.label;
        parcel.cost = costRules[1].costMultiplier * weight;
        parcel.priority = 2;
        parcel.label = 'Heavy';
    } else {
        // Accepted state
        parcel.state = rules.accept.label;

        // get volume for calculation
        const volume = utils.getVolume(height, width, depth);
        parcel.volume = volume;

        // only care about cost Rules where volume is trigger
        let ruleSet = costRules.filter((item) => {
            return item.costTrigger === 'volume'
                && item.costTrigger !== null
                && item.maxVol !== 'undefined';
        });

        // Small
        const isSmallParcel = (ruleSet.find((item) => {
            return volume < item.maxVol
                && item.minVol === 1;
        }));
        // Medium
        const isMediumParcel = (ruleSet.find((item) => {
            return (volume < item.maxVol && volume > item.minVol);
        }));

        if (isSmallParcel) {
            // Small
            parcel.cost = isSmallParcel.costMultiplier * volume;
            parcel.priority = isSmallParcel.priority;
            parcel.label = 'Small';
        } else if (isMediumParcel) {
            // Medium
            parcel.cost = isMediumParcel.costMultiplier * volume;
            parcel.priority = isMediumParcel.priority;
            parcel.label = 'Medium';
        } else {
            // Large Parcel
            const isLargeParcel = costRules.pop();
            parcel.cost = isLargeParcel.costMultiplier * volume;
            parcel.priority = isLargeParcel.priority;
            parcel.label = 'Large';

        }
    }
    const dimensions = `Weight: ${weight}\nHeight: ${height}\nWidth: ${width}\nDepth: ${depth}`;
    // Log to CLI user 
    utils.log(`---- Parcel Summary: \nState: ${parcel.state}\nPriority: ${parcel.priority} \nCategory: ${parcel.label}\nDimensions: ${dimensions}\nVolume: ${parcel.volume}\nCost: $${parcel.cost}\n---- End Summary ----\n`);
    return parcel;
};

export default getDeliveryCost;
