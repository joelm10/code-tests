import getDeliveryCost from './app';

// Test runners:

// Invalid Data
const TEST_invalidData = getDeliveryCost('a', 2, 3, 4);
// Priority 1 test
const TEST_isRejectedParcel = getDeliveryCost(110, 20, 55, 120);
// Priority 2 test
const TEST_heavyParcel = getDeliveryCost(22, 5, 5, 5);
// Priority 3 - Small Parcel test
const TEST_smallParcel = getDeliveryCost(2, 3, 10, 12);
// Medium Parcel Priority 3 test
const TEST_mediumParcel = getDeliveryCost(10, 20, 5, 20);
// TEST: Large parcel
const TEST_LargeParcel = getDeliveryCost(22, 30, 10, 10);